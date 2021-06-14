package com.suco.sucotalk.room.dto

import com.suco.sucotalk.chat.dto.MessageDto
import com.suco.sucotalk.room.domain.Room

data class RoomDetail(val room: RoomDto, val messages: List<MessageDto>) {

    companion object {
        fun of(room: Room, messages: List<MessageDto>): RoomDetail {
            return RoomDetail(RoomDto.of(room), messages)
        }
    }
}