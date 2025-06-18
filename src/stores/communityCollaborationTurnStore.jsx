import { create } from 'zustand'

export const useCommunityCollaborationTurn = create((set) => ({
  selectedCommunityCollaborationTurn:{},
  setSelectedCommunityCollaborationTurn:(p)=>{
    set({selectedCommunityCollaborationTurn:p})
  }
}))
