package com.lwy.lipicturebackend.model.dto.picture;

import lombok.Data;

import java.io.Serializable;

/**
 * 批量导入图片请求
 */
@Data
public class PictureUploadByBatchRequest implements Serializable {
    /**
     * 搜索词
     */
    private String searchText;
    /**
     * 抓取数量
     */
    private Integer count = 10;
    /**
     * 图片名称前缀
     */
    private String namePrefix;
    /**
     * 图片主色调
     */
    private String picColor;

    private static final long serialVersionUID = 1L;
}