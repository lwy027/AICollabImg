package com.lwy.lipicturebackend.generator.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lwy.lipicturebackend.exception.BusinessException;
import com.lwy.lipicturebackend.exception.ErrorCode;
import com.lwy.lipicturebackend.model.enums.UserRoleEnum;
import generator.domain.User;
import com.lwy.lipicturebackend.generator.service.UserService;
import com.lwy.lipicturebackend.generator.mapper.userMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

/**
 * @author 27595
 * @description 针对表【user(用户)】的数据库操作Service实现
 * @createDate 2025-02-07 12:35:06
 */
@Service
public class userServiceImpl extends ServiceImpl<userMapper, User> implements UserService {

    @Override
    public long userRegister(String userAccount, String userPassword, String checkPassword) {
        //1. 校验
        if (StrUtil.hasBlank(userAccount, userPassword, checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账户过短");
        }
        if (userPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户密码过短");
        }
        if (!userPassword.equals(checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "两次输入密码不一致");
        }
        //2.检查用户账号是否和数据库已有的一致
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        Long count = this.baseMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号重复");
        }
        //3.加密
        String encryptPassword = getEncryptPassword(userPassword);
        //4. 插入数据
        User user = new User();
        user.setUserAccount(userAccount);
        user.setUserPassword(encryptPassword);
        user.setUserName("无名");
        user.setUserRole(UserRoleEnum.USER.getValue());
        boolean saveResult = this.save(user);
        if (!saveResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "注册失败，数据库错误");
        }
        return user.getId();

    }

    @Override
    public String getEncryptPassword(String userPassword) {
        // 盐值，混淆密码
        final String SALT = "lwy";
        return DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
    }

}




