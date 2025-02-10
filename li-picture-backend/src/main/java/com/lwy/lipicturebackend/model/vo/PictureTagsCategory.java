package com.lwy.lipicturebackend.model.vo;

import lombok.Data;

import java.util.List;

@Data
//图片标签分类列表视图
public class PictureTagsCategory {


    /**
     * 标签列表
     */
    private List<String> tagList;

    /**
     * 分类列表
     */
    private List<String> categoryList;

}
