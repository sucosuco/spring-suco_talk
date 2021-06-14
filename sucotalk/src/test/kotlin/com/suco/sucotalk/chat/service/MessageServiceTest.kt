package com.suco.sucotalk.chat.service

import com.suco.sucotalk.chat.domain.Message
import com.suco.sucotalk.member.domain.Member
import com.suco.sucotalk.member.repository.MemberDao
import com.suco.sucotalk.room.domain.Room
import com.suco.sucotalk.room.repository.RoomDao
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@Transactional
class MessageServiceTest {

    @Autowired
    lateinit var messageService: MessageService

    @Autowired
    lateinit var memberDao: MemberDao

    @Autowired
    lateinit var roomDao: RoomDao

    private lateinit var testMember1: Member
    private lateinit var testMember2: Member
    private lateinit var testRoom: Room

    @BeforeEach
    fun init() {
        val memberId1 = memberDao.insert(Member("test1", "password"))
        testMember1 = memberDao.findById(memberId1)

        val memberId2 = memberDao.insert(Member("test2", "password"))
        testMember2 = memberDao.findById(memberId2)

        val roomId = roomDao.create(Room("testRoom",listOf(testMember1, testMember2)))
        testRoom = roomDao.findById(roomId)

        roomDao.saveParticipants(testRoom)
    }


    @DisplayName("메시지를 저장한다.")
    @Test
    fun saveMessage() {

        //given
        val testMessage = Message(sender = testMember1, room = testRoom, content = "테스트")

        //when
        val message = messageService.save(testMessage)

        //then
        assertThat(message.id).isNotNull
    }

    @DisplayName("채팅방의 모든 메시지를 가져온다.")
    @Test
    fun findAllMessageInRoom() {

        //given
        val testMessage1 = messageService.save(Message(sender = testMember1, room = testRoom, content = "테스트1"))
        val testMessage2 = messageService.save(Message(sender = testMember2, room = testRoom, content = "테스트2"))
        val testMessage3 = messageService.save(Message(sender = testMember2, room = testRoom, content = "테스트3"))

        //when
        val messages = messageService.findAllInRoom(testRoom)

        assertThat(messages.map { it.id })
            .contains(testMessage1.id)
            .contains(testMessage2.id)
            .contains(testMessage3.id)
    }
}