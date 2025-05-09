import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    findAll(): Promise<Article[]>;
    findOne(id: number): Promise<Article | null>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article | null>;
    remove(id: number): Promise<{
        message: string;
    }>;
    search(query: string): Promise<import("./dto/search-result.dto").SearchResultDto[]>;
}
