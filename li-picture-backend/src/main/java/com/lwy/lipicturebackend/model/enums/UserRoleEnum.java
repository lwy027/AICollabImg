package com.lwy.lipicturebackend.model.enums;

import cn.hutool.core.util.ObjUtil;
import lombok.Getter;

@Getter
public enum UserRoleEnum {
    USER("用户", "user"),

    ADMIN("管理员", "admin"),

    VIP("会员", "vip");

    private final String text;
    private final String value;

    UserRoleEnum(String text, String value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 根据value获取枚举
     *
     * @param value
     * @return 枚举值
     */
    public static UserRoleEnum getEnumByValue(String value) {
        if (ObjUtil.isEmpty(value)) {
            return null;
        }

        for (UserRoleEnum anEunm : UserRoleEnum.values()) {

            if (anEunm.value.equals(value)) {
                return anEunm;
            }
        }
        return null;
    }

}
