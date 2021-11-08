package com.display.swqualityboardbatch.job;

import com.display.swqualityboardbatch.dao.mongo.SystemRepository;
import com.display.swqualityboardbatch.dto.*;
import com.display.swqualityboardbatch.entity.mongo.*;

import com.display.swqualityboardbatch.entity.mongo.System;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.json.JacksonJsonObjectReader;
import org.springframework.batch.item.json.JsonItemReader;
import org.springframework.batch.item.json.builder.JsonItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class JobConfiguration {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final SystemRepository systemRepository;
    private final MongoTemplate mongoTemplate;

    @Bean
    public Job job() {
        return jobBuilderFactory.get("job")
                .start(systemReliabilityReaderStep())
                .next(systemReceptionRateReaderStep())
                .next(staticAnalysisReaderStep())
                .next(leadTimeAndDeliveryRateReaderStep())
                .next(functionalSuitabilityReaderStep())
                .next(conventionRateReaderStep())
                .next(codeReviewReaderStep())
                .build();
    }

    @Bean
    public Step systemReliabilityReaderStep() {
        return stepBuilderFactory.get("systemReliabilityReaderStep")
                .<SystemReliabilityDto, SystemReliabilityDto>chunk(4)
                .reader(systemReliabilityReader())
                .writer(systemReliabilityWriter())
                .build();
    }

    @Bean
    public Step systemReceptionRateReaderStep() {
        return stepBuilderFactory.get("systemReceptionRateReaderStep")
                .<SystemReceptionRateDto, SystemReceptionRateDto>chunk(4)
                .reader(systemReceptionRateReader())
                .writer(systemReceptionRateWriter())
                .build();
    }

    @Bean
    public Step staticAnalysisReaderStep() {
        return stepBuilderFactory.get("staticAnalysisReaderStep")
                .<StaticAnalysisDto, StaticAnalysisDto>chunk(11)
                .reader(staticAnalysisReader())
                .writer(staticAnalysisWriter())
                .build();
    }

    @Bean
    public Step leadTimeAndDeliveryRateReaderStep() {
        return stepBuilderFactory.get("leadTimeAndDeliveryRateReaderStep")
                .<LeadTimeAndDeliveryRateDto, LeadTimeAndDeliveryRateDto>chunk(6)
                .reader(leadTimeAndDeliveryRateReader())
                .writer(leadTimeAndDeliveryRateWriter())
                .build();
    }

    @Bean
    public Step functionalSuitabilityReaderStep() {
        return stepBuilderFactory.get("functionalSuitabilityReaderStep")
                .<FunctionalSuitabilityDto, FunctionalSuitabilityDto>chunk(5)
                .reader(functionalSuitabilityReader())
                .writer(functionalSuitabilityWriter())
                .build();
    }

    @Bean
    public Step conventionRateReaderStep() {
        return stepBuilderFactory.get("conventionRateReaderStep")
                .<CodeReviewDto, CodeReviewDto>chunk(4)
                .reader(codeReviewReader())
                .writer(codeReviewWriter())
                .build();
    }

    @Bean
    public Step codeReviewReaderStep() {
        return stepBuilderFactory.get("codeReviewReaderStep")
                .<SystemReliabilityDto, SystemReliabilityDto>chunk(5)
                .reader(systemReliabilityReader())
                .writer(systemReliabilityWriter())
                .build();
    }

    @Bean
    public JsonItemReader<SystemReliabilityDto> systemReliabilityReader() {
        return new JsonItemReaderBuilder<SystemReliabilityDto>()
                .jsonObjectReader(new JacksonJsonObjectReader<>(SystemReliabilityDto.class))
                .resource(new ClassPathResource("data/systemReliability.json"))
                .name("jsonItemReader")
                .build();
    }

    @Bean
    public ItemWriter<SystemReliabilityDto> systemReliabilityWriter() {
        return items -> {
            for (SystemReliabilityDto item : items) {
                System system = systemRepository.findByName(item.getSystem()).orElse(null);
                if (system == null) continue;

                Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(item.getDate());
                Query query = new Query();
                query.addCriteria(Criteria.where("system_id").is(system.getId()).and("createdAt").is(date));
                Update update = new Update();
                update.set("system_id", system.getId());
                update.set("mtbf", item.getMtbf());
                update.set("createdAt", date);

                mongoTemplate.upsert(query, update, Reliability.class);
            }
        };
    }

    @Bean
    public JsonItemReader<SystemReceptionRateDto> systemReceptionRateReader() {
        return new JsonItemReaderBuilder<SystemReceptionRateDto>()
                .jsonObjectReader(new JacksonJsonObjectReader<>(SystemReceptionRateDto.class))
                .resource(new ClassPathResource("data/systemReceptionRate.json"))
                .name("jsonItemReader")
                .build();
    }

    @Bean
    public ItemWriter<SystemReceptionRateDto> systemReceptionRateWriter() {
        return items -> {
            for (SystemReceptionRateDto item : items) {
                System system = systemRepository.findByName(item.getSystem()).orElse(null);
                if (system == null) continue;

                Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(item.getDate());
                Query query = new Query();
                query.addCriteria(Criteria.where("system_id").is(system.getId()).and("createdAt").is(date));
                Update update = new Update();
                update.set("system_id", system.getId());
                update.set("receptionRate", item.getRate());
                update.set("createdAt", date);

                mongoTemplate.upsert(query, update, ReceptionRate.class);
            }
        };
    }

    @Bean
    public JsonItemReader<StaticAnalysisDto> staticAnalysisReader() {
        return new JsonItemReaderBuilder<StaticAnalysisDto>()
                .jsonObjectReader(new JacksonJsonObjectReader<>(StaticAnalysisDto.class))
                .resource(new ClassPathResource("data/staticAnalysis.json"))
                .name("jsonItemReader")
                .build();
    }

    @Bean
    public ItemWriter<StaticAnalysisDto> staticAnalysisWriter() {
        return items -> {
            for (StaticAnalysisDto item : items) {
                System system = systemRepository.findByName(item.getSystem()).orElse(null);
                if (system == null) continue;

                Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(item.getDate());
                Query query = new Query();
                query.addCriteria(Criteria.where("system_id").is(system.getId()).and("createdAt").is(date));
                Update update = new Update();
                update.set("system_id", system.getId());
                update.set("critical", item.getCritical());
                update.set("high", item.getHigh());
                update.set("medium", item.getMedium());
                update.set("low", item.getLow());
                update.set("complexity", item.getComplexity());
                update.set("overlapping", item.getOverlapping());
                update.set("scale", item.getScale());
                update.set("testCoverage", item.getTestCoverage());
                update.set("createdAt", date);

                mongoTemplate.upsert(query, update, StaticAnalysis.class);
            }
        };
    }

    @Bean
    public JsonItemReader<LeadTimeAndDeliveryRateDto> leadTimeAndDeliveryRateReader() {
        return new JsonItemReaderBuilder<LeadTimeAndDeliveryRateDto>()
                .jsonObjectReader(new JacksonJsonObjectReader<>(LeadTimeAndDeliveryRateDto.class))
                .resource(new ClassPathResource("data/leadTimeAndDeliveryRate.json"))
                .name("jsonItemReader")
                .build();
    }

    @Bean
    public ItemWriter<LeadTimeAndDeliveryRateDto> leadTimeAndDeliveryRateWriter() {
        return items -> {
            for (LeadTimeAndDeliveryRateDto item : items) {
                System system = systemRepository.findByName(item.getSystem()).orElse(null);
                if (system == null) continue;

                Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(item.getDate());
                Query query = new Query();
                query.addCriteria(Criteria.where("system_id").is(system.getId()).and("createdAt").is(date));
                Update update = new Update();
                update.set("system_id", system.getId());
                update.set("devLeadTime", item.getDevLeadTime());
                update.set("numberRequest", item.getNumberRequest());
                update.set("numberOnTimeRequest", item.getNumberOnTimeRequest());
                update.set("createdAt", date);

                mongoTemplate.upsert(query, update, LeadTimeAndDeliveryRate.class);
            }
        };
    }

    @Bean
    public JsonItemReader<FunctionalSuitabilityDto> functionalSuitabilityReader() {
        return new JsonItemReaderBuilder<FunctionalSuitabilityDto>()
                .jsonObjectReader(new JacksonJsonObjectReader<>(FunctionalSuitabilityDto.class))
                .resource(new ClassPathResource("data/functionalSuitability.json"))
                .name("jsonItemReader")
                .build();
    }

    @Bean
    public ItemWriter<FunctionalSuitabilityDto> functionalSuitabilityWriter() {
        return items -> {
            for (FunctionalSuitabilityDto item : items) {
                System system = systemRepository.findByName(item.getSystem()).orElse(null);
                if (system == null) continue;

                Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(item.getDate());

                Query query = new Query();
                query.addCriteria(Criteria.where("system_id").is(system.getId()).and("createdAt").is(date));
                Update update = new Update();
                update.set("system_id", system.getId());
                update.set("numberRequest", item.getNumberRequest());
                update.set("numberSuitableImplementation", item.getNumberSuitableImplementation());
                update.set("createdAt", date);

                mongoTemplate.upsert(query, update, FunctionalSuitability.class);
            }
        };
    }

    @Bean
    public JsonItemReader<ConventionRateDto> conventionRateReader() {
        return new JsonItemReaderBuilder<ConventionRateDto>()
                .jsonObjectReader(new JacksonJsonObjectReader<>(ConventionRateDto.class))
                .resource(new ClassPathResource("data/conventionRate.json"))
                .name("jsonItemReader")
                .build();
    }

    @Bean
    public ItemWriter<ConventionRateDto> conventionRateWriter() {
        return items -> {
            for (ConventionRateDto item : items) {
                System system = systemRepository.findByName(item.getSystem()).orElse(null);
                if (system == null) continue;

                Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(item.getDate());
                Query query = new Query();
                query.addCriteria(Criteria.where("system_id").is(system.getId()).and("createdAt").is(date));
                Update update = new Update();
                update.set("system_id", system.getId());
                update.set("conventionRate", item.getRate());
                update.set("createdAt", date);

                mongoTemplate.upsert(query, update, ConventionRate.class);
            }
        };
    }

    @Bean
    public JsonItemReader<CodeReviewDto> codeReviewReader() {
        return new JsonItemReaderBuilder<CodeReviewDto>()
                .jsonObjectReader(new JacksonJsonObjectReader<>(CodeReviewDto.class))
                .resource(new ClassPathResource("data/codeReview.json"))
                .name("jsonItemReader")
                .build();
    }

    @Bean
    public ItemWriter<CodeReviewDto> codeReviewWriter() {
        return items -> {
            for (CodeReviewDto item : items) {
                System system = systemRepository.findByName(item.getSystem()).orElse(null);
                if (system == null) continue;

                Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(item.getDate());
                Query query = new Query();
                query.addCriteria(Criteria.where("system_id").is(system.getId()).and("createdAt").is(date));
                Update update = new Update();
                update.set("system_id", system.getId());
                update.set("totalNumberPeople", item.getTotalNumberPeople());
                update.set("reviewedNumberPeople", item.getReviewedNumberPeople());
                update.set("createdAt", date);

                mongoTemplate.upsert(query, update, CodeReview.class);
            }
        };
    }

}
