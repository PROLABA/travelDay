export function initVideoPlayers(): void {
    const videoContainers = document.querySelectorAll<HTMLElement>('.video-container');
    
    videoContainers.forEach(container => {
      const poster = container.querySelector<HTMLElement>('.video-poster');
      const video = container.querySelector<HTMLVideoElement>('video');
      const playButton = container.querySelector<HTMLElement>('.play-button');
  
      if (!video || !poster || !playButton) return;
  
      const playVideo = () => {
        video.style.display = 'block';
        poster.style.display = 'none';
        
        video.play().catch(error => {
          console.error('Video play error:', error);
          // Fallback: show poster if play failed
          video.style.display = 'none';
          poster.style.display = 'flex';
        });
      };
  
      // Обработчики для клика
      poster.addEventListener('click', playVideo);
      playButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Предотвращаем срабатывание клика на poster
        playVideo();
      });
  
      // Обработчик для ошибок видео
      video.addEventListener('error', () => {
        console.error('Error loading video');
        video.style.display = 'none';
        poster.style.display = 'flex';
      });
    });
  }