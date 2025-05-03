import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { SearchResultDto } from './dto/search-result.dto';
import { getPreviewWithHighlight, highlightMatch } from '../common/utils/highlight.util';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  async findAll() : Promise<Article[]> {
    return this.articleRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) : Promise<Article | null> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) : Promise<Article | null> {
    const article = await this.articleRepository.preload({
      id, ...updateArticleDto,
    });

    if (!article) throw new NotFoundException(`Article with id ${id} not found`);
    return this.articleRepository.save(article);
  }

  async remove(id: number) : Promise<{ message: string }> {
    const result = await this.articleRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException(`Article with id ${id} not found`);
    return { message: 'Article deleted successfully' };
  }

  async search(query: string, page = 1, limit = 10): Promise<SearchResultDto[]> {
    const [articles, total] = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.title ILIKE :query', { query: `%${query}%` })
      .orWhere('article.body ILIKE :query', { query: `%${query}%` })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return articles.map(article => ({
      id: article.id,
      title: highlightMatch(article.title, query),
      preview: getPreviewWithHighlight(article.body, query)
    }));
  }
}

