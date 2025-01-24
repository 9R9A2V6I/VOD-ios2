export const formatDuration = (duration = '00:00:00') => {
  const parts = duration.split(':');
  return parts.length === 3 && parts[0] === '00'
    ? `${parts[1]}:${parts[2]}`
    : duration;
};
