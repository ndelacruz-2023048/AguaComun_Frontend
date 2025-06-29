import React from 'react';
import { Progress } from 'antd';
import { Icon } from '@iconify/react';

const FundraisingCampaingsCard = ({
  startTime = '9:00 am',
  title = 'Search Inspiration for Project',
  link = 'www.dribbble.com',
  comments = 8,
  percent = 24,
  onReminder = () => {},
}) => {
  return (
    <div className="flex items-center bg-[#e9f7df] rounded-2xl shadow px-6 py-4 w-[95%]  gap-6 ">
      {/* Start from */}
      <div className="flex flex-col items-center min-w-[90px]">
        <button className="bg-[#75BF3B]/10 text-[#75BF3B] rounded-full p-2 mb-2">
          <Icon icon="solar:tag-linear" width="28" height="28" />
        </button>
        <span className="text-xs text-gray-400">Start from</span>
        <span className="flex items-center gap-1 text-sm text-gray-700 font-semibold">
          <Icon icon="mdi:clock-outline" width="16" height="16" />
          {startTime}
        </span>
      </div>

      {/* Main info */}
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-base font-semibold text-gray-800">{title}</span>
        <div className="flex items-center gap-4 mt-1">
          <a href={`https://${link}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#75BF3B] underline flex items-center gap-1">
            <Icon icon="mdi:link-variant" width="16" height="16" />
            {link}
          </a>
        </div>
      </div>

      {/* Progress */}
      <div className="flex flex-col items-center w-[20%]">
        <span className="text-xs text-gray-800 mb-1">{percent}% complete</span>
        <Progress percent={percent} showInfo={false} strokeColor="#75BF3B" trailColor="#E5E7EB" className="w-24" />
      </div>

      {/* Reminder button */}
      <button
        onClick={onReminder}
        className="flex items-center gap-2 bg-[#75BF3B] text-[#ffffff] px-4 py-2 rounded-xl font-semibold text-sm hover:bg-[#66a62f] transition"
      >
        <Icon icon="lets-icons:view-alt-duotone" width="20" height="20" />
        Ver más
      </button>
    </div>
  );
};

export default FundraisingCampaingsCard; 