'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [step, setStep] = useState<'start' | 'timer' | 'birthday'>('start');
  const [timeLeft, setTimeLeft] = useState(10);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  const [showModal, setShowModal] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const name = 'Нұрғазы';

  useEffect(() => {
    if (step === 'timer') {
      if (timeLeft > 0) {
        const timerId = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
          if (timeLeft === 6 && !playMusic) {
            setPlayMusic(true);
          }
        }, 1000);
        return () => clearTimeout(timerId);
      } else {
        setStep('birthday');
        launchConfetti();
      }
    }
  }, [step, timeLeft, playMusic]);

  useEffect(() => {
    if (step === 'birthday') {
      const targetDate = new Date('2026-03-26T15:00:00').getTime();

      const updateTimer = () => {
        const now = Date.now();
        const difference = targetDate - now;

        if (difference <= 0) {
          setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
          return true;
        }

        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          total: difference
        });
        return false;
      };

      const isFinished = updateTimer();

      if (!isFinished) {
        const intervalId = setInterval(() => {
          const finished = updateTimer();
          if (finished) clearInterval(intervalId);
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }
  }, [step]);

  const launchConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const startTimer = () => {
    setStep('timer');
  };

  const mediaItems = [
    { id: 1, type: 'img', src: '/assets/photo_2026-03-25_03-00-10.jpg', color: '#ff4da6', class: 'float-1', left: '8%', top: '5%' },
    { id: 2, type: 'video', src: '/assets/doc_2026-03-25_16-24-12.mp4', color: '#33ccff', class: 'float-2', left: '65%', top: '10%' },
    { id: 3, type: 'video', src: '/assets/doc_2026-03-25_16-24-19.mp4', color: '#ffcc00', class: 'float-3', left: '15%', top: '50%' },
    { id: 4, type: 'img', src: '/assets/photo_2026-03-25_16-23-49.jpg', color: '#99ff33', class: 'float-4', left: '72%', top: '45%' },
    { id: 5, type: 'img', src: '/assets/photo_2026-03-25_16-23-52.jpg', color: '#ff7f50', class: 'float-1', left: '5%', top: '80%' },
    { id: 6, type: 'img', src: '/assets/photo_2026-03-25_16-23-55.jpg', color: '#8a2be2', class: 'float-2', left: '80%', top: '75%' },
    { id: 7, type: 'img', src: '/assets/photo_2026-03-25_16-23-57.jpg', color: '#00fa9a', class: 'float-3', left: '20%', top: '25%' },
    { id: 8, type: 'img', src: '/assets/photo_2026-03-25_16-24-00.jpg', color: '#ffb6c1', class: 'float-4', left: '85%', top: '25%' },
    { id: 9, type: 'img', src: '/assets/photo_2026-03-25_16-24-03.jpg', color: '#00ffff', class: 'float-1', left: '10%', top: '70%' },
    { id: 10, type: 'img', src: '/assets/photo_2026-03-25_16-24-05.jpg', color: '#ff4500', class: 'float-2', left: '75%', top: '60%' },
    { id: 11, type: 'video', src: '/assets/video_2026-03-25_16-24-08.mp4', color: '#1e90ff', class: 'float-3', left: '25%', top: '80%' },
    { id: 12, type: 'video', src: '/assets/video_2026-03-25_16-24-16.mp4', color: '#adff2f', class: 'float-4', left: '60%', top: '85%' },
  ];

  return (
    <main className='relative min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white font-sans overflow-hidden'>
      <div className='liquid-blob bg-purple-600 w-[60vw] h-[60vw] md:w-96 md:h-96 top-0 left-[-10%]' />
      <div className='liquid-blob bg-cyan-500 w-[70vw] h-[70vw] md:w-80 md:h-80 bottom-10 right-[-5%]' style={{ animationDelay: '2s' }} />
      <div className='liquid-blob bg-pink-500 w-[50vw] h-[50vw] md:w-72 md:h-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' style={{ animationDelay: '4s' }} />

      {playMusic && (
        <div className='hidden'>
          <iframe 
            src='https://www.youtube.com/embed/uagxFiGwps0?autoplay=1&controls=0&playsinline=1' 
            allow='autoplay; encrypted-media'
            title='Music'
          />
        </div>
      )}

      {step === 'start' && (
        <div className='z-20 glass-panel rounded-3xl p-8 md:p-12 flex flex-col items-center text-center animate-fade-in transition-all hover:scale-105 mx-4'>
          <h1 className='text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-white'>Готовы к сюрпризу?</h1>
          <p className='text-lg md:text-xl text-cyan-100 mb-8 font-light'>Сделай звук погромче 🔊</p>
          <button 
            onClick={startTimer}
            className='px-10 py-4 glass hover:bg-white/20 rounded-full font-bold text-xl backdrop-blur-md transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 text-white outline-none cursor-pointer'
          >
            Начать
          </button>
        </div>
      )}

      {step === 'timer' && (
        <div className='z-20 glass-panel rounded-full w-56 h-56 md:w-72 md:h-72 flex items-center justify-center shadow-[0_0_50px_rgba(0,255,255,0.3)] animate-fade-in'>
          <span className='text-8xl md:text-[8rem] font-bold bg-clip-text text-transparent bg-gradient-to-br from-cyan-300 via-white to-pink-300'>
            {timeLeft}
          </span>
        </div>
      )}

      {step === 'birthday' && (
        <>
          <div className='absolute inset-0 pointer-events-none z-10 overflow-hidden'>
            {mediaItems.map((media) => (
              <div 
                key={media.id} 
                className={`absolute flex flex-col items-center transition-all duration-500 ${media.class} ${selectedMedia?.id === media.id ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-70'}`} 
                style={{ left: media.left, top: media.top }}
              >
                <div className='balloon shadow-xl' style={{ backgroundColor: media.color, zIndex: 30 }}>
                  <div className='balloon-shine'></div>
                </div>
                <div className='w-[1px] h-12 md:h-24 bg-gradient-to-b from-white/60 to-white/20 z-10'></div>
                <div 
                  className='p-1.5 md:p-2 glass rounded-sm shadow-2xl transform rotate-3 hover:rotate-0 hover:scale-110 transition-all pointer-events-auto z-20 mt-0 bg-white/20 backdrop-blur-md border border-white/30 md:pb-8 pb-4 origin-top cursor-pointer'
                  onClick={() => setSelectedMedia(media)}
                >
                  {media.type === 'video' ? (
                    <video src={media.src} autoPlay loop muted playsInline className='w-20 h-28 md:w-40 md:h-52 object-cover rounded shadow-inner bg-black/40' />
                  ) : (
                    <img src={media.src} alt='Memory Frame' className='w-20 h-28 md:w-40 md:h-52 object-cover rounded shadow-inner bg-black/40'
                         onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIiBkeT0iLjNlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+0JrQsNGA0YLQuNC90LrQsDwvdGV4dD48L3N2Zz4='; }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='z-20 glass-panel rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-14 flex flex-col items-center text-center w-[95%] sm:w-[90%] max-w-2xl shadow-[0_0_60px_rgba(0,0,0,0.4)] animate-fade-in relative overflow-hidden group mt-6 md:mt-10'>
            <div className='absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2rem] md:rounded-t-[2.5rem]' />
            
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] leading-tight z-10'>
               С днём рождения, <br /> <span className='text-white drop-shadow-[0_0_15px_rgba(218,112,214,0.8)] mt-1 md:mt-2 inline-block'>{name}!</span>
            </h1>
            <p className='text-sm sm:text-base md:text-2xl text-slate-200 mb-5 md:mb-6 tracking-wide font-light z-10'>
              Этот сайт был создан только для тебя и удалится через: ✨
            </p>

            {timeRemaining.total > 0 && (
              <div className='z-10 mb-6 md:mb-8 flex flex-col items-center bg-white/5 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/10'>
                <div className='flex gap-2 sm:gap-3 md:gap-5 text-center'>
                  {timeRemaining.days > 0 && (
                    <>
                      <div className='flex flex-col'>
                        <span className='text-lg md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-cyan-300 via-white to-pink-300'>
                          {String(timeRemaining.days).padStart(2, '0')}
                        </span>
                        <span className='text-[8px] md:text-xs text-cyan-100 mt-1 uppercase tracking-widest'>Дней</span>
                      </div>
                      <span className='text-lg md:text-3xl font-bold text-white/30'>:</span>
                    </>
                  )}
                  <div className='flex flex-col'>
                    <span className='text-lg md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-cyan-300 via-white to-pink-300'>
                      {String(timeRemaining.hours).padStart(2, '0')}
                    </span>
                    <span className='text-[8px] md:text-xs text-cyan-100 mt-1 uppercase tracking-widest'>Часов</span>
                  </div>
                  <span className='text-lg md:text-3xl font-bold text-white/30'>:</span>
                  <div className='flex flex-col'>
                    <span className='text-lg md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-cyan-300 via-white to-pink-300'>
                      {String(timeRemaining.minutes).padStart(2, '0')}
                    </span>
                    <span className='text-[8px] md:text-xs text-cyan-100 mt-1 uppercase tracking-widest'>Минут</span>
                  </div>
                  <span className='text-lg md:text-3xl font-bold text-white/30'>:</span>
                  <div className='flex flex-col'>
                    <span className='text-lg md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-cyan-300 via-white to-pink-300'>
                      {String(timeRemaining.seconds).padStart(2, '0')}
                    </span>
                    <span className='text-[8px] md:text-xs text-cyan-100 mt-1 uppercase tracking-widest'>Секунд</span>
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={() => setShowModal(true)}
              className='px-8 sm:px-10 md:px-16 py-3 md:py-5 glass hover:bg-white/20 rounded-full font-bold text-base md:text-2xl outline-none transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(218,112,214,0.4)] text-white z-10 cursor-pointer'
            >
              Открыть сюрприз
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-lg transition-all'>
          <div className='glass-panel rounded-3xl p-8 w-full max-w-lg animate-fade-in relative shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col items-center text-center'>
            <button 
              onClick={() => setShowModal(false)}
              className='absolute top-4 right-5 text-slate-300 hover:text-white text-2xl transition-colors outline-none cursor-pointer p-2'
            >
              ✕
            </button>
            <div className='w-20 h-20 rounded-full glass flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,105,180,0.4)] text-4xl'>
              💖
            </div>
            <h2 className='text-3xl font-bold text-white mb-6 drop-shadow-md'>
              Особое послание!
            </h2>
            <div className='glass bg-white/5 rounded-2xl p-6 md:p-8 mb-8 w-full text-lg md:text-xl leading-relaxed text-slate-50 font-medium shadow-inner'>
              Желаю, чтобы каждый день был полон ярких эмоций, искренних улыбок и огромного счастья! Пусть все твои мечты становятся реальностью, а впереди ждет только самое лучшее! 🎉
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className='w-full py-4 bg-gradient-to-r from-pink-500/80 to-purple-500/80 hover:from-pink-500 hover:to-purple-500 rounded-full font-bold text-xl transition-all shadow-[0_0_20px_rgba(255,105,180,0.5)] text-white cursor-pointer outline-none'
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {selectedMedia && (
        <div 
          className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all animate-fade-in cursor-pointer'
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className='relative max-w-4xl max-h-[90vh] w-full flex justify-center items-center animate-fade-in group cursor-default transform scale-100 transition-transform duration-500'
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === 'video' ? (
              <video src={selectedMedia.src} autoPlay loop controls playsInline className='max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.2)] pointer-events-auto' />
            ) : (
              <img src={selectedMedia.src} alt='Full Memory' className='max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.2)] pointer-events-auto' />
            )}
            <button 
              onClick={() => setSelectedMedia(null)}
              className='absolute -top-12 right-0 md:-right-12 md:top-0 text-white/50 hover:text-white text-4xl p-2 transition-colors outline-none pointer-events-auto'
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
