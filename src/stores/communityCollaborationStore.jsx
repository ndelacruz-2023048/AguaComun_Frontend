import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL

export const useCommunityCollaboration = create((set,get)=>({
    isModalCommunityCollaborationOpen:false,
    setIsModalCommunityCollaborationOpen:()=>{
        const {isModalCommunityCollaborationOpen} = get()
        set({isModalCommunityCollaborationOpen:isModalCommunityCollaborationOpen ? false : true})
    },
    createActivityCollaboration:async(p)=>{
        const response = await fetch(`${API_URL}/v1/aguacomun/communityCollaboration`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json" // Le dice al servidor que el cuerpo es JSON
            },
            body:JSON.stringify(p)
        })
        const responseJSON = await response.json()
        return {
            data:responseJSON
        }
    },
    idCommunityCollaboration:0,
    setIdCommunityCollaboration:(p)=>{
        set({idCommunityCollaboration:p})
    },
    turnByActivityCollaboration:[],
    setTurnByActivityCollaboration:(p)=>{
        set({turnByActivityCollaboration:p})
    },
    getTurnByActivityCollaboration:async(p)=>{
        const response = await fetch(`${API_URL}/v1/aguacomun/communityTurn/${p}`)
        const responseJSON = await response.json()
        set({turnByActivityCollaboration:responseJSON})
        return {
            data:responseJSON
        }
    },
    isModalCommunityTurnConfirmationOpen:false,
    setIsModalCommunityTurnConfirmationOpen:()=>{
        const {isModalCommunityTurnConfirmationOpen} = get()
        set({isModalCommunityTurnConfirmationOpen:isModalCommunityTurnConfirmationOpen ? false : true})
    }

}))
