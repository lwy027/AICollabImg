package com.lwy.lipicturebackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lwy.lipicturebackend.model.dto.user.UserQueryRequest;
import com.lwy.lipicturebackend.model.vo.LoginUserVO;
import com.lwy.lipicturebackend.model.vo.UserVo;
import generator.domain.User;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 *
 */

public interface UserService extends IService<User> {
    /**
     * 用户注册
     *
     * @param userAccount   用户账户
     * @param userPassword  用户密码
     * @param checkPassword 校验密码
     * @return 新用户 id
     */
    long userRegister(String userAccount, String userPassword, String checkPassword);

    String getEncryptPassword(String userPassword);

    /**
     * 用户登录
     *
     * @param userAccount  用户账户
     * @param userPassword 用户密码
     * @param request
     * @return 脱敏后的用户信息
     */
    LoginUserVO userLogin(String userAccount, String userPassword, HttpServletRequest request);

    LoginUserVO getLoginUserVO(User user);

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    User getLoginUser(HttpServletRequest request);

    /**
     * 用户注销
     *
     * @param request
     * @return
     */
    boolean userLogout(HttpServletRequest request);


    UserVo getUserVo(User user);


    List<UserVo> getUserVoList(List<User> userList);

    QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest);
}
