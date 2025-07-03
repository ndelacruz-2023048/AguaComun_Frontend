import { Calendar, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { useCommunityCollaboration } from '../../../../stores/communityCollaborationStore'

export const CommunityCollaborationCalendar = () => {
  const { turnsAssignedToUser } = useCommunityCollaboration()

  // Renderiza un punto en el calendario solo para los turnos asignados al usuario
  const dateCellRender = (value) => {
    const listData = Array.isArray(turnsAssignedToUser)
      ? turnsAssignedToUser.filter(
          item => dayjs(item.dateAssigned).isSame(value, 'day')
        )
      : []
    return (
      <ul className="m-0 p-0 list-none">
        {listData.map((item, idx) => (
          <li key={item._id || idx} className="inline-block mr-1">
            <Tooltip title={`${item.activityId?.activityName || 'Colaboración'} (${item.startTime} - ${item.endTime})`}>
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block cursor-pointer"></span>
            </Tooltip>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <Calendar cellRender={dateCellRender} />
    </div>
  )
}