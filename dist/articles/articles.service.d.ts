import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { SearchResultDto } from './dto/search-result.dto';
export declare class ArticlesService {
    private readonly articleRepository;
    constructor(articleRepository: Repository<Article>);
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    findAll(): Promise<Article[]>;
    findOne(id: number): Promise<Article | null>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article | null>;
    remove(id: number): Promise<{
        message: string;
    }>;
    search(query: string, page?: number, limit?: number): Promise<SearchResultDto[]>;
}
