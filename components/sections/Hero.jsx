import React from 'react'

export default function Hero() {
    return (
        <div className='relative w-full flex min-h-[70vh] sm:h-115 lg:h-155'>
            <div className="flex px-6 sm:px-12 lg:ml-20 flex-col justify-center gap-4 sm:gap-6 z-20 w-full lg:w-3/4 bg-background bg-linear-to-r from-background via-background/80 to-transparent lg:via-background lg:to-transparent mask-r-from-40% transition-colors duration-300 ease-in-out">
                <h2 className='text-lg sm:text-xl lg:text-2xl text-body transition-colors duration-300 ease-in-out'>Lançamento do ano</h2>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl text-heading transition-colors duration-300 ease-in-out'>Tênis Air Max</h1>
                <p className='text-highlight text-sm sm:text-base transition-colors duration-300 ease-in-out'>Tênis esportivo com amortecimento avançado.</p>
                <button className='bg-primary w-fit text-primary-foreground px-4 py-2 rounded-full text-sm sm:text-base cursor-pointer hover:shadow-md hover:shadow-primary-shadow hover:scale-102 transition-all ease-in-out duration-200'>Ver produto</button>
            </div>
            <div className='absolute top-0 right-0 w-full sm:w-3/4 lg:w-200 h-full'>
                <img
                    loading='lazy'
                    className='flex justify-end object-cover object-[30%_70%] h-full w-full mask-b-from-75% mask-x-from-90% dark:brightness-[0.92] transition-[filter] duration-300 ease-in-out'
                    src="https://imgnike-a.akamaihd.net/768x768/02951654A1.jpg" alt="Tênis Air Max" />
            </div>
        </div>
    );
}
