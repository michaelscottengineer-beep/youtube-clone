export function parseYoutubeVideoDuration(time: string) {
  const newTime = time.toUpperCase();

  if (!newTime.startsWith('P')) throw new Error('this is not duration from youtube')
  
  const [period, duration] = time.split('P');
}