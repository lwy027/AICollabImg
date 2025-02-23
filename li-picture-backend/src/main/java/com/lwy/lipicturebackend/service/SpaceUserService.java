package com.lwy.lipicturebackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.lwy.lipicturebackend.model.dto.spaceuser.SpaceUserAddRequest;
import com.lwy.lipicturebackend.model.dto.spaceuser.SpaceUserQueryRequest;
import com.lwy.lipicturebackend.model.entity.SpaceUser;
import com.lwy.lipicturebackend.model.vo.spaceUser.SpaceUserVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author 27595
 * @description 针对表【space_user(空间用户关联)】的数据库操作Service
 * @createDate 2025-02-21 17:29:48
 */
public interface SpaceUserService extends IService<SpaceUser> {

    long addSpaceUser(SpaceUserAddRequest spaceUserAddRequest);

    void validSpaceUser(SpaceUser spaceUser, boolean add);

    SpaceUserVO getSpaceUserVO(SpaceUser spaceUser, HttpServletRequest request);


    List<SpaceUserVO> getSpaceUserVOList(List<SpaceUser> spaceUserList);

    QueryWrapper<SpaceUser> getQueryWrapper(SpaceUserQueryRequest spaceUserQueryRequest);
}
