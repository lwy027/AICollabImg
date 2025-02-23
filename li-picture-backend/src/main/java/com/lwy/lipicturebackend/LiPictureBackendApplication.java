package com.lwy.lipicturebackend;

import org.apache.shardingsphere.spring.boot.ShardingSphereAutoConfiguration;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(exclude = {ShardingSphereAutoConfiguration.class})
@EnableAsync
@MapperScan("com.lwy.lipicturebackend.mapper")
@EnableAspectJAutoProxy(exposeProxy = true)
public class LiPictureBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LiPictureBackendApplication.class, args);
    }

}
