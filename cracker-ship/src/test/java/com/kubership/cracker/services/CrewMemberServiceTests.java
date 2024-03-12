package com.kubership.cracker.services;

import com.kubership.cracker.model.CrewMember;
import com.kubership.cracker.model.Ship;
import com.kubership.cracker.model.Ship_CrewMember;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;

@SpringBootTest
@Transactional
public class CrewMemberServiceTests {

    @MockBean
    private CrewMemberService mockCrewMemberService;
    /*
    @Test
    void verifyInsertCrewMember(){
        CrewMember crewMember=CrewMember.builder().name("Lorenor Zoro").build();

        when(mockCrewMemberService.insertCrewMember(crewMember)).thenReturn(crewMember);
        CrewMember savedCrewMember=mockCrewMemberService.insertCrewMember(crewMember);

        Assertions.assertNotNull(savedCrewMember);
        Assertions.assertEquals(crewMember.getName(),savedCrewMember.getName());
    }

    @Test
    void verifyInsertCrewMemberAlreadyExists(){
        CrewMember crewMember=CrewMember.builder().name("Lorenor Zoro").build();

        when(mockCrewMemberService.insertCrewMember(crewMember)).thenReturn(crewMember);
        CrewMember savedCrewMember=mockCrewMemberService.insertCrewMember(crewMember);

        when(mockCrewMemberService.insertCrewMember(savedCrewMember)).thenReturn(null);
        CrewMember savedCrewMemberNull=mockCrewMemberService.insertCrewMember(savedCrewMember);

        Assertions.assertNull(savedCrewMemberNull);
    }

    @Test
    void verifyInsertCrewMembers(){
        CrewMember crewMember=CrewMember.builder().name("Monkey D. Ruffy").build();
        CrewMember crewMember1=CrewMember.builder().name("Lorenor Zoro").build();

        List<CrewMember> expectedCrewMembers=Arrays.asList(crewMember, crewMember1);

        when(mockCrewMemberService.insertCrewMembers(expectedCrewMembers)).thenReturn(expectedCrewMembers);

        List<CrewMember> crewMembers = mockCrewMemberService.insertCrewMembers(expectedCrewMembers);

        Assertions.assertEquals(expectedCrewMembers, crewMembers);
    }

    @Test
    void verifyGetCrewMembersByShipnr(){
        Ship ship=Ship.builder().shipnr(1).name("Thousand Sunny").build();

        CrewMember crewMember=CrewMember.builder().name("Monkey D. Luffy").build();
        CrewMember crewMember1=CrewMember.builder().name("Lorenor Zoro").build();
    }

    @Test
    void verifyUpdateCrewMember(){
        CrewMember crewMember=CrewMember.builder().crewmemberid(1).name("Monkey D. Ruffy").build();
        CrewMember updateCrewMember=CrewMember.builder().crewmemberid(1).name("Monkey D. Luffy").build();

        Ship_CrewMember shipCrewMember=Ship_CrewMember.builder().crewmember(crewMember).build();
        when(mockCrewMemberService.insertCrewMember(crewMember)).thenReturn(crewMember);
        CrewMember savedCrewMember=mockCrewMemberService.insertCrewMember(crewMember);

        when(mockCrewMemberService.updateCrewMember(updateCrewMember)).thenReturn(updateCrewMember);

        CrewMember updatedCrewMember=mockCrewMemberService.updateCrewMember(updateCrewMember);


        Assertions.assertNotEquals(savedCrewMember, updatedCrewMember);
        Assertions.assertEquals(savedCrewMember.getCrewmemberid(), updateCrewMember.getCrewmemberid());
    }

    @Test
    void verifyDeleteCrewMember(){
        CrewMember crewMember=CrewMember.builder().name("Monkey D. Ruffy").build();

        when(mockCrewMemberService.deleteCrewMember(crewMember.getCrewmemberid())).thenReturn(true);

        boolean success=mockCrewMemberService.deleteCrewMember(crewMember.getCrewmemberid());
        Assertions.assertTrue(success);
    }

    @Test
    void verifyDeleteCrewMemberNotExists(){
        when(mockCrewMemberService.deleteCrewMember(1001)).thenReturn(false);

        boolean success=mockCrewMemberService.deleteCrewMember(1001);
        Assertions.assertFalse(success);
    }
     */
}
