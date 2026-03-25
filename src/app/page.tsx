'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [step, setStep] = useState<'start' | 'timer' | 'birthday'>('start');
  const [timeLeft, setTimeLeft] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
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
    { id: 2, type: 'video', src: '/assets/doc_2026-03-25_16-24-14.mp4', color: '#33ccff', class: 'float-2', left: '65%', top: '10%' },
    { id: 3, type: 'img', src: '/assets/doc_2026-03-25_16-24-19.mp4', color: '#ffcc00', class: 'float-3', left: '15%', top: '50%' },
    { id: 4, type: 'img', src: '/assets/photo_2026-03-25_16-23-49.jpg', color: '#99ff33', class: 'float-4', left: '72%', top: '45%' },
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
              <div key={media.id} className={`absolute flex flex-col items-center ${media.class}`} style={{ left: media.left, top: media.top }}>
                <div className='balloon shadow-xl' style={{ backgroundColor: media.color, zIndex: 30 }}>
                  <div className='balloon-shine'></div>
                </div>
                <div className='w-[1px] h-16 md:h-24 bg-gradient-to-b from-white/60 to-white/20 z-10'></div>
                <div className='p-2 glass rounded-sm shadow-2xl transform rotate-3 hover:rotate-0 transition-transform pointer-events-auto z-20 mt-0 bg-white/20 backdrop-blur-md border border-white/30 pb-6 md:pb-8 origin-top'>
                  {media.type === 'video' ? (
                    <video src={media.src} autoPlay loop muted playsInline className='w-24 h-32 md:w-40 md:h-52 object-cover rounded shadow-inner bg-black/40' />
                  ) : (
                    <img src={media.src} alt='Memory Frame' className='w-24 h-32 md:w-40 md:h-52 object-cover rounded shadow-inner bg-black/40'
                         onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIiBkeT0iLjNlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+0JrQsNGA0YLQuNC90LrQsDwvdGV4dD48L3N2Zz4='; }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='z-20 glass-panel rounded-[2.5rem] p-8 md:p-14 flex flex-col items-center text-center w-[90%] max-w-2xl shadow-[0_0_60px_rgba(0,0,0,0.4)] animate-fade-in relative overflow-hidden group mt-10'>
            <div className='absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2.5rem]' />
            
            <h1 className='text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] leading-tight z-10'>
               С днём рождения, <br /> <span className='text-white drop-shadow-[0_0_15px_rgba(218,112,214,0.8)] mt-2 inline-block'>{name}!</span>
            </h1>
            <p className='text-lg md:text-2xl text-slate-200 mb-10 tracking-wide font-light z-10'>
              Самый особенный день настал ✨
            </p>

            <button 
              onClick={() => setShowModal(true)}
              className='px-12 md:px-16 py-4 md:py-5 glass hover:bg-white/20 rounded-full font-bold text-xl md:text-2xl outline-none transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(218,112,214,0.4)] text-white z-10 cursor-pointer'
            >
              Enter
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
    </main>
  );
}
