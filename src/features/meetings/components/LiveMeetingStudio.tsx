import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Radio,
  Square,
  Pause,
  Play,
  Download,
  Sparkles,
  Users,
  CheckSquare,
  AlertCircle,
  Volume2,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { TranscriptSegment } from '../../../types/meeting';
import { Task, TaskPriority } from '../../../types/task';
import toast from 'react-hot-toast';

interface LiveMeetingStudioProps {
  meetingId: string;
  meetingTitle: string;
  currentUserName: string;
  onTranscriptAdd: (segment: TranscriptSegment) => void;
  onCommitmentExtracted: (task: { title: string; assigneeName?: string; priority: TaskPriority }) => void;
  onRecordingSaved: (audioBlob: Blob, durationSeconds: number) => void;
  onClose: () => void;
}

export const LiveMeetingStudio: React.FC<LiveMeetingStudioProps> = ({
  meetingId,
  meetingTitle,
  currentUserName,
  onTranscriptAdd,
  onCommitmentExtracted,
  onRecordingSaved,
  onClose,
}) => {
  // Device & Stream States
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  // Live Speech Recognition & AI
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [liveInterimText, setLiveInterimText] = useState<string>('');
  const [liveSegments, setLiveSegments] = useState<TranscriptSegment[]>([]);
  const [liveCommitments, setLiveCommitments] = useState<{ id: string; title: string; assignee: string }[]>([]);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Initialize Media Stream (Camera & Microphone)
  useEffect(() => {
    let isMounted = true;

    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
        toast.success('Camera & microphone connected successfully!');
      } catch (err: any) {
        console.warn('Could not access video/audio media stream:', err);
        setHasCameraPermission(false);
        toast.error('Camera/Microphone access blocked or unavailable. You can still use speech recognition.');
      }
    }

    initMedia();

    return () => {
      isMounted = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) clearInterval(timerRef.current);
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  // Toggle Camera Track
  const toggleCamera = () => {
    if (mediaStreamRef.current) {
      const videoTracks = mediaStreamRef.current.getVideoTracks();
      videoTracks.forEach((t) => {
        t.enabled = !isCameraOn;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  // Toggle Mic Track
  const toggleMic = () => {
    if (mediaStreamRef.current) {
      const audioTracks = mediaStreamRef.current.getAudioTracks();
      audioTracks.forEach((t) => {
        t.enabled = !isMicOn;
      });
      setIsMicOn(!isMicOn);
    }
  };

  // Start Live Audio Recording & Speech Recognition
  const startRecordingAndTranscription = () => {
    audioChunksRef.current = [];
    setRecordingSeconds(0);

    // 1. Audio Recording Setup
    if (mediaStreamRef.current) {
      try {
        const recorder = new MediaRecorder(mediaStreamRef.current, {
          mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg',
        });

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          onRecordingSaved(blob, recordingSeconds);
        };

        recorder.start(1000);
        mediaRecorderRef.current = recorder;
      } catch (e) {
        console.warn('MediaRecorder error:', e);
      }
    }

    // Timer Interval
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);

    setIsRecording(true);
    setIsPaused(false);

    // 2. Web Speech API Setup
    startSpeechRecognition();
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error('Browser Speech Recognition API is not supported in this browser. Using audio recorder mode.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsTranscribing(true);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptText = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            processFinalTranscriptSentence(transcriptText.trim());
          } else {
            interim += transcriptText;
          }
        }
        setLiveInterimText(interim);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e.error);
      };

      recognition.onend = () => {
        // Automatically restart if still recording
        if (isRecording && !isPaused && speechRecognitionRef.current) {
          try {
            speechRecognitionRef.current.start();
          } catch {}
        }
      };

      recognition.start();
      speechRecognitionRef.current = recognition;
    } catch (err) {
      console.warn('Failed to start Speech Recognition:', err);
    }
  };

  // Analyze Recognized Speech Sentences
  const processFinalTranscriptSentence = (text: string) => {
    if (!text) return;

    const timestampFormatted = formatTimer(recordingSeconds);
    const newSegment: TranscriptSegment = {
      id: `seg_live_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      meetingId,
      speakerName: currentUserName,
      speakerEmail: currentUserName.toLowerCase().replace(/\s+/g, '.') + '@execflow.ai',
      startTimeSeconds: recordingSeconds,
      endTimeSeconds: recordingSeconds + 3,
      text,
      confidence: 0.96,
      language: 'en',
    };

    setLiveSegments((prev) => [...prev, newSegment]);
    onTranscriptAdd(newSegment);
    setLiveInterimText('');

    // Detect Commitment / Action Item trigger patterns
    detectCommitmentsInSentence(text);
  };

  const detectCommitmentsInSentence = (sentence: string) => {
    const lower = sentence.toLowerCase();
    const commitmentPatterns = [
      /i will\s+(.+)/i,
      /i commit to\s+(.+)/i,
      /i'll handle\s+(.+)/i,
      /we need to\s+(.+)/i,
      /action item:\s+(.+)/i,
      /(\w+)\s+will\s+(.+)/i,
    ];

    for (const pattern of commitmentPatterns) {
      const match = lower.match(pattern);
      if (match && match[1]) {
        let extractedTitle = match[1].replace(/^(be|take care of|work on)\s+/, '').trim();
        if (extractedTitle.length > 5) {
          // Capitalize first letter
          extractedTitle = extractedTitle.charAt(0).toUpperCase() + extractedTitle.slice(1);
          const assignee = currentUserName;

          const newCommitment = {
            id: `cm_${Date.now()}`,
            title: extractedTitle,
            assignee,
          };

          setLiveCommitments((prev) => [newCommitment, ...prev]);
          onCommitmentExtracted({
            title: extractedTitle,
            assigneeName: assignee,
            priority: 'HIGH',
          });

          toast.success(`Action Item Detected: "${extractedTitle}"`, { icon: '🎯' });
          break;
        }
      }
    }
  };

  // Stop Recording
  const stopRecordingAndTranscription = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
    }

    setIsRecording(false);
    setIsTranscribing(false);
    setIsPaused(false);
    toast.success('Live recording stopped. Audio & transcript synchronized with meeting record.');
  };

  const downloadLocalAudioBlob = () => {
    if (audioChunksRef.current.length === 0) {
      toast.error('No recorded audio available to download.');
      return;
    }
    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Meeting_Recording_${meetingId}_${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Audio recording downloaded locally!');
  };

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = Math.floor(totalSec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0B0D]/95 backdrop-blur-md flex flex-col p-4 md:p-6 overflow-hidden">
      {/* Top Studio Control Bar */}
      <div className="flex items-center justify-between bg-[#111315] border border-[#7CB518]/30 rounded-xl px-5 py-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-[#7CB518] animate-pulse" />
          <div>
            <h2 className="text-sm font-bold text-white font-heading">{meetingTitle}</h2>
            <p className="text-[10px] text-zinc-400 font-mono">
              Live Meeting Host Studio • Host: <span className="text-[#7CB518] font-semibold">{currentUserName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isRecording && (
            <Badge variant="danger" className="gap-1.5 px-3 py-1 text-xs font-mono animate-pulse">
              <Radio className="w-3.5 h-3.5 text-red-400" />
              REC {formatTimer(recordingSeconds)}
            </Badge>
          )}

          {audioChunksRef.current.length > 0 && !isRecording && (
            <Button
              variant="outline"
              size="sm"
              onClick={downloadLocalAudioBlob}
              className="border-[#7CB518]/40 text-[#7CB518] hover:bg-[#7CB518]/10 text-xs gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Save Audio (.webm)
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (isRecording) stopRecordingAndTranscription();
              onClose();
            }}
            className="text-zinc-400 hover:text-white text-xs"
          >
            Exit Studio
          </Button>
        </div>
      </div>

      {/* Main Studio Center Section */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 overflow-hidden">
        {/* Left Column: Host Camera Preview & Video Controls */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <div className="relative flex-1 bg-[#16181A] border border-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center min-h-[340px] shadow-2xl">
            {hasCameraPermission === false && (
              <div className="text-center p-6 space-y-2">
                <VideoOff className="h-12 w-12 text-zinc-600 mx-auto" />
                <p className="text-xs text-zinc-400 font-mono">Camera stream inactive or permission denied.</p>
                <p className="text-[11px] text-zinc-500">You can still start live speech transcription and audio recording.</p>
              </div>
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform scale-x-[-1] ${!isCameraOn ? 'hidden' : ''}`}
            />

            {!isCameraOn && hasCameraPermission !== false && (
              <div className="text-center space-y-2">
                <div className="h-20 w-20 rounded-full bg-[#7CB518]/20 border-2 border-[#7CB518] flex items-center justify-center text-[#7CB518] font-bold text-xl mx-auto shadow-lg">
                  {currentUserName.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-xs font-semibold text-zinc-300 font-heading">{currentUserName} (Camera Muted)</p>
              </div>
            )}

            {/* In-video Overlay Badge */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-white font-medium">{currentUserName} (Host)</span>
            </div>

            {/* Bottom Video Controls Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-2.5 flex items-center gap-3 shadow-2xl">
              <button
                type="button"
                onClick={toggleMic}
                className={`p-3 rounded-full transition-all ${
                  isMicOn ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-red-500/80 text-white'
                }`}
                title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </button>

              <button
                type="button"
                onClick={toggleCamera}
                className={`p-3 rounded-full transition-all ${
                  isCameraOn ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-red-500/80 text-white'
                }`}
                title={isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {isCameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </button>

              <div className="h-6 w-px bg-zinc-700 mx-1" />

              {!isRecording ? (
                <Button
                  onClick={startRecordingAndTranscription}
                  className="bg-[#7CB518] hover:bg-[#689913] text-black font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Radio className="h-4 w-4" />
                  Start Recording & Live Transcribe
                </Button>
              ) : (
                <Button
                  onClick={stopRecordingAndTranscription}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg animate-pulse"
                >
                  <Square className="h-4 w-4" />
                  Stop Recording
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Real-time Transcript & Commitment Feeds */}
        <div className="flex flex-col space-y-4 overflow-hidden">
          {/* Live Transcript Stream Card */}
          <Card className="flex-1 bg-[#111315] border-[#7CB518]/20 flex flex-col overflow-hidden shadow-xl">
            <CardHeader className="pb-2 border-b border-zinc-800/80">
              <CardTitle className="text-xs font-bold text-white font-heading flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-[#7CB518]" />
                  Live Real-Time Speech Transcript
                </span>
                {isTranscribing && (
                  <Badge variant="success" className="text-[10px] gap-1 px-2 py-0.5 animate-pulse">
                    Listening...
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar text-xs">
              {liveSegments.length === 0 && !liveInterimText && (
                <div className="text-center py-10 text-zinc-500 space-y-2 font-mono">
                  <Sparkles className="h-6 w-6 text-zinc-600 mx-auto" />
                  <p>Click "Start Recording & Live Transcribe" to capture spoken conversation in real-time.</p>
                </div>
              )}

              {liveSegments.map((seg) => (
                <div key={seg.id} className="bg-[#181a1d] border border-zinc-800 rounded-lg p-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span className="font-bold text-[#7CB518]">{seg.speakerName}</span>
                    <span>{formatTimer(seg.startTimeSeconds)}</span>
                  </div>
                  <p className="text-zinc-200 leading-relaxed">{seg.text}</p>
                </div>
              ))}

              {liveInterimText && (
                <div className="bg-[#7CB518]/10 border border-[#7CB518]/30 rounded-lg p-2.5 text-xs text-[#7CB518] italic animate-pulse">
                  <span className="font-bold font-mono mr-1">{currentUserName}:</span>
                  {liveInterimText}...
                </div>
              )}
            </CardContent>
          </Card>

          {/* Live Commitment & Action Items Feed */}
          <Card className="h-48 bg-[#111315] border-[#7CB518]/20 flex flex-col overflow-hidden shadow-xl">
            <CardHeader className="pb-2 border-b border-zinc-800/80">
              <CardTitle className="text-xs font-bold text-white font-heading flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-[#7CB518]" />
                Auto-Extracted Action Commitments ({liveCommitments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-3 overflow-y-auto space-y-2 custom-scrollbar">
              {liveCommitments.length === 0 ? (
                <p className="text-[11px] text-zinc-500 font-mono text-center py-4">
                  Spoken commitments (e.g. "I will prepare the presentation by tomorrow") will automatically appear here.
                </p>
              ) : (
                liveCommitments.map((cm) => (
                  <div key={cm.id} className="flex items-start gap-2 bg-[#181a1d] border border-[#7CB518]/30 rounded-lg p-2 text-xs">
                    <CheckSquare className="h-3.5 w-3.5 text-[#7CB518] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white font-medium">{cm.title}</p>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Assigned to: {cm.assignee}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
