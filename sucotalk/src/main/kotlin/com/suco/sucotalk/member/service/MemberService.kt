package com.suco.sucotalk.member.service

import com.suco.sucotalk.member.domain.Member
import com.suco.sucotalk.member.repository.MemberDao
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Transactional(readOnly = true)
@Service
class MemberService(private val memberDao: MemberDao) {
    fun findById(id: Long): Member {
        return memberDao.findById(id)
    }

    @Transactional
    fun createMember(name: String, password: String): Long {
        return memberDao.insert(Member(name, password))
    }

    fun login(loginRequest: Member): String {
        val savedMember = memberDao.findByName(loginRequest.name)
        savedMember.confirmPassword(savedMember.password)
        return savedMember.name
    }
}