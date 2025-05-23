"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./entities/article.entity");
const highlight_util_1 = require("../common/utils/highlight.util");
let ArticlesService = class ArticlesService {
    articleRepository;
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    async create(createArticleDto) {
        const article = this.articleRepository.create(createArticleDto);
        return this.articleRepository.save(article);
    }
    async findAll() {
        return this.articleRepository.find({
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findOne(id) {
        const article = await this.articleRepository.findOne({ where: { id } });
        if (!article) {
            throw new common_1.NotFoundException(`Article with id ${id} not found`);
        }
        return article;
    }
    async update(id, updateArticleDto) {
        const article = await this.articleRepository.preload({
            id, ...updateArticleDto,
        });
        if (!article)
            throw new common_1.NotFoundException(`Article with id ${id} not found`);
        return this.articleRepository.save(article);
    }
    async remove(id) {
        const result = await this.articleRepository.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException(`Article with id ${id} not found`);
        return { message: 'Article deleted successfully' };
    }
    async search(query, page = 1, limit = 10) {
        const [articles, total] = await this.articleRepository
            .createQueryBuilder('article')
            .where('article.title LIKE :query', { query: `%${query}%` })
            .orWhere('article.body LIKE :query', { query: `%${query}%` })
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return articles.map(article => ({
            id: article.id,
            title: (0, highlight_util_1.highlightMatch)(article.title, query),
            preview: (0, highlight_util_1.getPreviewWithHighlight)(article.body, query)
        }));
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map