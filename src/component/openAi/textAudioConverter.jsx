
import { useEffect } from "react";
import '../../component/homePage/home.css'
import { FaPlay } from "react-icons/fa6";

function TextAudioConverter(){



    useEffect(() => {
        let voice = [];
        let speech = new SpeechSynthesisUtterance();
    
        console.log('entered')
    
        const populateVoiceList = () => {
            const voiceSelect = document.querySelector("select");
            if (!voiceSelect) return; // Ensure the select element exists
    
            voiceSelect.innerHTML = '';
    
            voice = window.speechSynthesis.getVoices();
            voice.forEach((voice, i) => {
                voiceSelect.options[i] = new Option(voice.name, i);
            });
            speech.voice = voice[0];
        };
    
        const handleClick = () => {
            const textarea = document.querySelector("textarea");
            if (!textarea) return; // Ensure the textarea element exists
    
            speech.text = textarea.value;
            window.speechSynthesis.speak(speech);
        };
    
        const handleSelectChange = () => {
            const voiceSelect = document.querySelector("select");
            if (!voiceSelect) return; // Ensure the select element exists
    
            speech.voice = voice[voiceSelect.value];
        };
    
        const voiceSelect = document.querySelector("select");
        if (voiceSelect) {
            voiceSelect.addEventListener("change", handleSelectChange);
        }
    
        const button = document.querySelector('button');
        if (button) {
            button.addEventListener("click", handleClick);
        }
    
        window.speechSynthesis.onvoiceschanged = populateVoiceList;
    
        populateVoiceList();
    
        return () => {
        
            if (voiceSelect) {
                voiceSelect.removeEventListener("change", handleSelectChange);
            }
            if (button) {
                button.removeEventListener("click", handleClick);
            }
        };
    }, []);


    return(


        <>
        
        <div>

<div className='flex flex-col justify-center items-center mt-[50px]'>
    <h1 className=' textClass'>
        Text Audio <span className='font-bold'>Converter</span>
    </h1>
    <textarea className=' textarea border rounded-md h-[400px]  bg-cyan-900 p-3 text-yellow-50' type='text' placeholder='Type your  text....'></textarea><br />
</div>
<div className='flex justify-center'>
    <select className='select rounded'></select>
    <button className='bg-cyan-800 text-white p-2 rounded w-[70px] flex  '> <span className="pr-1 pt-1"><FaPlay /></span>Play </button>
</div>
</div>
        
        </>
    )
}


export default TextAudioConverter