import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ModerateCommentDto } from './dto/moderate-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, ipAddress?: string, userAgent?: string): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      ipAddress,
      userAgent,
    });
    return this.commentRepository.save(comment);
  }

  async findAll(status?: string): Promise<Comment[]> {
    const query = this.commentRepository.createQueryBuilder('comment')
      .orderBy('comment.createdAt', 'DESC');
    
    if (status) {
      query.where('comment.status = :status', { status });
    }
    
    return query.getMany();
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async findByPostId(postId: string, status?: string): Promise<Comment[]> {
    const query = this.commentRepository.createQueryBuilder('comment')
      .where('comment.postId = :postId', { postId })
      .orderBy('comment.createdAt', 'ASC');
    
    if (status) {
      query.andWhere('comment.status = :status', { status });
    }
    
    return query.getMany();
  }

  async findReplies(parentId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { parentId },
      order: { createdAt: 'ASC' },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    
    // Update only the fields provided in the DTO
    Object.assign(comment, updateCommentDto);
    
    return this.commentRepository.save(comment);
  }

  async moderate(id: number, moderateCommentDto: ModerateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    comment.status = moderateCommentDto.status;
    return this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async countByStatus(): Promise<Record<string, number>> {
    const results = await this.commentRepository
      .createQueryBuilder('comment')
      .select('comment.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('comment.status')
      .getRawMany();

    const counts: Record<string, number> = {
      pending: 0,
      approved: 0,
      rejected: 0,
      spam: 0,
    };

    results.forEach(result => {
      counts[result.status] = parseInt(result.count);
    });

    return counts;
  }
}
