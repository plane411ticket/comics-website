// import React, {useEffect, useState, useRef, use} from 'react';
// import { FaWindowMinimize } from 'react-icons/fa';

// //Interface 
// interface AudioPlayProps {
//     audioContent: string;
//     audioTitle?: string;
// }

// const AudioPlay = ({audioContent, audioTitle}:AudioPlayProps) => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [Volume, setVolume] = useState(1);
//     const [Speed, setSpeed] = useState(1);
//     const [Sentence, SetSentence] = useState<string[]>([]);
//     const [Index, setIndex] = useState(0);
//     const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    
//     console.log("audioContent:", window.speechSynthesis.getVoices());
//     //Take sentences
//     useEffect(() => {
//         if (audioContent)
//         {
//             const senten_split = audioContent.split(/(?<=[.!?])\s+/);
//             SetSentence(senten_split);
//             setIndex(0);
//         }
//     }, [audioContent]);

//     //Read each sentence
//     const HandlePlayEachSentence = (index:number) => 
//     {
//         if (index > Sentence.length)
//         {
//             setIsPlaying(false);
//             return;
//         }

//         const utterance = new SpeechSynthesisUtterance(Sentence[index]);
//         const voices = window.speechSynthesis.getVoices();
//         const vnvoice = voices.find(voice => voice.lang === 'vi-VN');
//         if (vnvoice) 
//         {
//             utterance.voice = vnvoice;
//         }
//         utterance.lang = 'vi-VN';
//         utterance.pitch = 1;
//         utterance.rate = 1;
//         utterance.volume = 1;
//         utterance.onend = () => 
//         {
//             setIndex (positon => {
//                 const newIndex = positon + 1;
//                 if (newIndex < Sentence.length)
//                 {
//                     return newIndex;
//                 }
//                 else
//                 {
//                     setIsPlaying(false);
//                     return positon;
//                 }
//             });
//         };

//         utteranceRef.current = utterance;
//         window.speechSynthesis.speak(utterance);
//     };

//     //Auto read
//     useEffect(() => {
//         if (isPlaying && Index < Sentence.length) {
//             HandlePlayEachSentence(Index);
//         }
//     }, [Index, isPlaying]);

//     //Start Audio
//     const HandlePlay = () => 
//     {
//         if (!isPlaying && Index < Sentence.length) {
//             setIsPlaying(true);
//         }
//     }

//     //Pause Audio
//     const HanlePause = () => 
//     {
//         if (utteranceRef.current)
//         {
//             window.speechSynthesis.pause();
//             setIsPlaying(false);
//         }
//     };

//     //Change Volume
//     const HandleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newVolume = parseFloat(event.target.value);
//         setVolume(newVolume);
//     };

//     //Change Speed
//     const HandleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newSpeed = parseFloat(event.target.value);
//         setSpeed(newSpeed);
//     };

//     //Next Sentence
//     const HandleNext = () => {
//         if (Index < Sentence.length - 1) {
//             window.speechSynthesis.cancel();
//             setIndex(Index + 1);
//         }
//     };

//     //Previous Sentence
//     const HandlePrevious = () => {
//         if (Index > 0) {
//             window.speechSynthesis.cancel();
//             setIndex(Index - 1);
//         }
//     };

//     //Sentence Change
//     const HandleSentenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newIndex = parseInt(event.target.value);
//         window.speechSynthesis.cancel();
//         setIndex(newIndex);
//     };

//     //Clean
//     useEffect (() => {
//         return () => {
//             if (utteranceRef.current) {
//                 window.speechSynthesis.cancel();
//                 utteranceRef.current = null;
//             }
//         }
//     }, [])

//     return (
//         <div className="bg-white p-4 rounded-xl shadow-md mt-10 space-y-4">
//             <div className="space-x-2">
//                 <button
//                     onClick={HandlePlay}
//                     disabled={isPlaying}
//                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
//                 >
//                     ▶️ Đọc
//                 </button>
//                 <button
//                     onClick={HanlePause}
//                     disabled={!isPlaying}
//                     className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
//                 >
//                     ⏸ Dừng
//                 </button>
//                 <button
//                     onClick={HandlePrevious}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                     ⏮ Lui 1 câu
//                 </button>
//                 <button
//                     onClick={HandleNext}
//                     className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
//                 >
//                     ⏭ Tới 1 câu
//                 </button>
//             </div>

//             <div>
//                 <label className="block">🔊 Âm lượng: {Volume.toFixed(2)}</label>
//                 <input
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.01"
//                     value={Volume}
//                     onChange={HandleVolumeChange}
//                     className="w-full"
//                 />
//             </div>

//             <div>
//                 <label className="block">⏩ Tốc độ: {Speed.toFixed(2)}</label>
//                 <input
//                     type="range"
//                     min="1"
//                     max="3"
//                     step="0.25"
//                     value={Speed}
//                     onChange={HandleSpeedChange}
//                     className="w-full"
//                 />
//             </div>

//             <div>
//                 <label className="block">📊 Tiến độ đọc: {Index + 1}/{Sentence.length}</label>
//                 <input
//                     type="range"
//                     min="0"
//                     max={Sentence.length - 1}
//                     value={Index}
//                     onChange={HandleSentenceChange}
//                     className="w-full"
//                 />
//             </div>

//             <div>
//                 <p className="text-gray-600 italic">
//                     🗣 Câu hiện tại:<br />
//                     <strong>{Sentence[Index]}</strong>
//                 </p>
//             </div>
//         </div>
//     );
// }
// export default AudioPlay;

//<script src="https://code.responsivevoice.org/responsivevoice.js?key=zzqcuKfu"></script>

import React, {useEffect, useState, useRef} from 'react';

//Interface 
interface AudioPlayProps {
    audioContent: string;
    audioTitle?: string;
}

const AudioPlay = ({audioContent, audioTitle}:AudioPlayProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [speed, setSpeed] = useState(1);
    const [sentenceList, SetSentence] = useState<string[]>([]);
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<number | null>(null);
    
    //Take sentences
    useEffect(() => {
        if (audioContent)
        {
            const senten_split = audioContent.split(/(?<=[.!?])\s+/);
            SetSentence(senten_split);
            setIndex(0);
        }
    }, [audioContent]);

    //Read each sentence
    const speakCurrentSentence = () => 
    {
        const sentence = sentenceList[index];
        if (!sentence)
        {
            setIsPlaying(false);
            return;
        }
        setIsPlaying(true);
        
        responsiveVoice.speak(sentence, "Vietnamese Female", {
                speed: speed,
                volume: volume,
                onend: () => {
                    timeoutRef.current = window.setTimeout(() => {
                        setIndex((previous) => 
                        {
                            const nextIndex = previous + 1;
                            if (nextIndex < sentenceList.length) 
                            {
                                return nextIndex;
                            }
                            else 
                            {
                                setIsPlaying(false);
                                return previous;
                            }
                        });
                    }, 100);
                },
        });
    };

    //Auto read
    useEffect(() => {
        if (isPlaying && index < sentenceList.length) {
            speakCurrentSentence();
        }
    }, [index, isPlaying]);

    //Start Audio
    const handlePlay = () => 
    {
        if (!isPlaying) {
            speakCurrentSentence();
        }
    }

    //Pause Audio
    const hanlePause = () => 
    {
        if (isPlaying)
        {
            responsiveVoice.pause();
            setIsPlaying(false);
        }
    };

    //Change Volume
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
    };

    //Change Speed
    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeed = parseFloat(event.target.value);
        setSpeed(newSpeed);
    };

    //Next Sentence
    const handleNext = () => {
        responsiveVoice.cancel();
        if (index < sentenceList.length - 1) 
        {
            setIndex(index + 1);
        }
    };

    //Previous Sentence
    const handlePrevious = () => {
        responsiveVoice.cancel();
        if (index > 0) 
        {
            setIndex(index - 1);
        }
    };

    //Sentence Change
    const handleSentenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        responsiveVoice.cancel();
        const newIndex = parseInt(event.target.value);
        setIndex(newIndex);
    };

    //Clean
    useEffect (() => {
        return () => {
            responsiveVoice.cancel();
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [])

    return (
        <div className="bg-white p-4 rounded-xl shadow-md mt-10 space-y-4">
            <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">{audioTitle}</h2>
            <div className="space-x-2">
                <button
                    onClick={handlePlay}
                    disabled={isPlaying}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                >
                    ▶️ Đọc
                </button>
                <button
                    onClick={hanlePause}
                    disabled={!isPlaying}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                >
                    ⏸ Dừng
                </button>
                <button
                    onClick={handlePrevious}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    ⏮ Lui
                </button>
                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                    ⏭ Tới
                </button>
            </div>

            <div>
                <label className="block">🔊 Âm lượng: {volume.toFixed(2)}</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full"
                />
            </div>

            <div>
                <label className="block">⏩ Tốc độ: {speed.toFixed(2)}</label>
                <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.25"
                    value={speed}
                    onChange={handleSpeedChange}
                    className="w-full"
                />
            </div>

            <div>
                <label className="block">📊 Tiến độ đọc: {index + 1}/{sentenceList.length}</label>
                <input
                    type="range"
                    min="0"
                    max={sentenceList.length - 1}
                    value={index}
                    onChange={handleSentenceChange}
                    className="w-full"
                />
            </div>

            <div>
                <p className="text-gray-600 italic">
                    🗣 Câu hiện tại:<br />
                    <strong>{sentenceList[index]}</strong>
                </p>
            </div>
        </div>
    );
}
export default AudioPlay;

{/* <script src="https://code.responsivevoice.org/responsivevoice.js?key=zzqcuKfu"></script> */}