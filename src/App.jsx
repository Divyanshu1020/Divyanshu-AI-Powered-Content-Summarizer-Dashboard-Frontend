import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from 'axios';
import { htmlToText } from 'html-to-text';
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from 'react';
import './App.css';
import { mockSummarizeAPI } from './api/api.config';
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import jsPDF from "jspdf";
import { buildHistory } from "./helper/buildHistory";
import { DateTime } from "luxon";
function App() {
  const [inputText, setInputText] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summaryLength, setSummaryLength] = useState('short');
  const [summary, setSummary] = useState('');
  const [user, setUser] = useState('');
  const inputTextRef = useRef(null)


  const logout = () => {
    setUser(null);
  };


  const exportToText = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'summary.txt';
    document.body.appendChild(element);
    element.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(summary, 10, 10);
    doc.save('summary.pdf');
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await mockSummarizeAPI(inputText, summaryLength)
      setSummary(response);
      buildHistory({ timestamp: DateTime.now().toFormat("cccc, dd LLL yyyy' | 'HH:mm a"), title: response }, user)

    } catch (error) {
      console.error("Error generating summary: ", error);
    } finally {
      setLoading(false);
    }
  };

  const scrapeContent = async () => {
    try {

      const url = 'https://www.npmjs.com/package/cors-anywhere';

      const response = await axios.get(`https://cors-anywhere.herokuapp.com/${url}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
      });
      const html = response.data;

      const textContent = htmlToText(html, {
        wordwrap: 130,
        selectors: [{ selector: 'a', options: { ignoreHref: true } }]
      });
      inputTextRef.current.value = textContent;
    } catch (error) {
      console.error("Error scraping content: ", error);
      inputTextRef.current.value = error;
    }
  };

  const textareaOnSubmit = (e) => {
    e.preventDefault();
    setInputText(inputTextRef.current.value);
    handleSummarize();
  }


  return user ? (
    <div className="relative">
      <p className=" absolute bottom-0 right-0">version: 0.1.1</p>
      <Navbar logout={logout} user={user} />
      <div className=' p-1 sm:p-6'>
        <h1 className=' text-xl sm:text-4xl font-bold'>AI-Powered Content Summarizer Dashboard</h1>
      </div>

      

      <div className=" flex flex-col  sm:flex-row gap-7">

        <div className=" w-full h-full" >
          <div className=" sm:text-start">
            <h2 className="text-sm sm:text-xl sm:font-medium">Paste or type your long-form content here or Enter URL</h2>
          </div>

          <div className="my-2 text-start ">
            <Label className=" sm:text-lg" htmlFor="message-2">Your URL</Label>
            <div className=" flex flex-row gap-3">
              <Input
                type="text"
                placeholder="Paste URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                dir="auto"
                className=" bg-gray-100  w-full"
              />
              <Button className=" h-9" onClick={scrapeContent}>Scrape</Button>
            </div>
          </div>
          <h1 className=" sm:text-xl sm:font-medium">OR</h1>



          <div className="">
            <Textarea
              className=" sm:text-xl sm:font-normal sm:min-h-[350px] sm:h-full resize-none bg-gray-100"
              row={40}
              ref={inputTextRef}
              placeholder="Paste or type your long-form content here..." />

          </div>
          <div className=" py-2 sm:py-7 flex flex-row items-center gap-4">
            <Select className=" h-full" value={summaryLength} onValueChange={(value) => { setSummaryLength(value) }}>
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Summary Length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="long">Long</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="w-1/2 h-9"
              onClick={textareaOnSubmit}
            >Submit</Button>

          </div>
        </div>

        

        <div className=" w-full h-full">
          <div className=" p-2 sm:p-3 ">
            <h2 className="text-xl sm:text-4xl font-medium">Summary</h2>
          </div>
          <div className=" relative">
            <Textarea
              placeholder="AI Summarized Text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              disabled={loading}

              className=" sm:h-[422px] resize-none bg-gray-300"
            />
            {loading && (
              <div className="w-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                <Loader2 height={40} width={40} className="mx-auto animate-spin" />
                <p className="text-sm">Summarizing...</p>
              </div>
            )}
          </div>
          <div className=" py-2 sm:py-7 flex flex-row items-center gap-4">
            <Button  
              onClick={exportToText}
              variant="outline" 
              className=" w-1/2 h-9">Export as Text</Button>
            <Button 
              onClick={exportToPDF}
              className="w-1/2 h-9">Export as PDF</Button>
          </div>
        </div>
      </div>







    </div>
  ) : (
    <Auth setUser={setUser} />
  )
}

export default App
