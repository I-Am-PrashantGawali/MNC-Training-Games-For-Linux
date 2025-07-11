
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Palette, Trophy, RefreshCw, User, Eraser, Pencil, Home, Download, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const ScribbleGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [guess, setGuess] = useState('');
  const [gameMode, setGameMode] = useState<'team' | 'solo' | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState<'waiting' | 'drawing' | 'guessing' | 'ended'>('waiting');
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [currentTool, setCurrentTool] = useState<'pencil' | 'eraser'>('pencil');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentLineWidth, setCurrentLineWidth] = useState(3);
  const [teamMembers] = useState(['Sarah', 'Mike', 'Lisa', 'David']);
  const { toast } = useToast();
  const { user } = useAuth();

  const words = ['Computer', 'Elephant', 'Pizza', 'Rocket', 'Guitar', 'Rainbow', 'Castle', 'Dragon'];
  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

  useEffect(() => {
    if (gameState === 'drawing' || gameState === 'guessing') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  const selectGameMode = (mode: 'team' | 'solo') => {
    setGameMode(mode);
    if (mode === 'solo') {
      setCurrentPlayer('You');
    } else {
      const allMembers = [user?.name || 'You', ...teamMembers];
      setCurrentPlayer(allMembers[Math.floor(Math.random() * allMembers.length)]);
    }
    startGame();
  };

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setGameState('drawing');
    setTimeLeft(60);
    setGuess('');
    
    toast({
      title: "Game Started!",
      description: `${gameMode === 'team' ? 'Team' : 'Solo'} mode - Draw: ${randomWord}`,
    });
  };

  const handleTimeUp = () => {
    if (gameState === 'drawing') {
      setGameState('guessing');
      setTimeLeft(30);
    } else {
      endRound();
    }
  };

  const endRound = () => {
    setGameState('ended');
    toast({
      title: "Round Complete!",
      description: `The word was: ${currentWord}`,
    });
  };

  const handleGuess = () => {
    if (guess.toLowerCase() === currentWord.toLowerCase()) {
      setScore(prev => prev + 10);
      toast({
        title: "Correct!",
        description: `You guessed "${currentWord}" correctly!`,
      });
      endRound();
    } else {
      toast({
        title: "Try Again",
        description: "That's not quite right!",
        variant: "destructive",
      });
    }
    setGuess('');
  };

  const nextRound = () => {
    setRound(prev => prev + 1);
    if (gameMode === 'team') {
      const allMembers = [user?.name || 'You', ...teamMembers];
      const nextPlayerIndex = (allMembers.indexOf(currentPlayer) + 1) % allMembers.length;
      setCurrentPlayer(allMembers[nextPlayerIndex]);
    }
    startGame();
  };

  const resetGame = () => {
    setGameState('waiting');
    setGameMode(null);
    setScore(0);
    setRound(1);
    setTimeLeft(60);
    setCurrentWord('');
    setGuess('');
    
    clearCanvas();
  };

  // Improved canvas drawing functions with better pointer tracking
  const getCanvasCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0]?.clientX || 0;
      clientY = e.touches[0]?.clientY || 0;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (gameState !== 'drawing') return;
    
    setIsDrawing(true);
    const coords = getCanvasCoordinates(e);
    setLastPos(coords);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || gameState !== 'drawing') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const coords = getCanvasCoordinates(e);
    
    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = currentLineWidth;
      ctx.strokeStyle = currentColor;
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    
    setLastPos(coords);
  };

  const stopDrawing = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Set white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `scribble-${currentWord || 'drawing'}-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Drawing Saved!",
        description: "Your artwork has been downloaded successfully.",
      });
    }
  };

  // Initialize canvas with white background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  if (gameMode === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-6">
            <Link to="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                <Palette className="h-8 w-8" />
                Scribble Fun
              </CardTitle>
              <CardDescription className="text-lg">
                Choose your game mode to start drawing and guessing!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500" 
                      onClick={() => selectGameMode('team')}>
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-xl font-semibold mb-2">Team Mode</h3>
                    <p className="text-muted-foreground">
                      Play with your team members. Take turns drawing and guessing together!
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-500" 
                      onClick={() => selectGameMode('solo')}>
                  <CardContent className="p-6 text-center">
                    <User className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h3 className="text-xl font-semibold mb-2">Solo Mode</h3>
                    <p className="text-muted-foreground">
                      Practice your drawing skills alone. Perfect for honing your artistic abilities!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Palette className="h-6 w-6" />
                  Scribble Fun - {gameMode === 'team' ? 'Team' : 'Solo'} Mode
                </CardTitle>
                <CardDescription>Round {round} • Current Player: {currentPlayer}</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {timeLeft}s
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  Score: {score}
                </Badge>
                <Link to="/dashboard">
                  <Button variant="outline">
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={resetGame}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Game
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Drawing Canvas */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Drawing Canvas</span>
                  <div className="flex items-center gap-2">
                    {gameState === 'drawing' && (
                      <span className="text-sm">Word: <strong>{currentWord}</strong></span>
                    )}
                    <Button variant="outline" size="sm" onClick={saveDrawing}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearCanvas}>
                      Clear
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Enhanced Drawing Tools */}
                {gameState === 'drawing' && (
                  <div className="mb-4 space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <Button
                          variant={currentTool === 'pencil' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentTool('pencil')}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={currentTool === 'eraser' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentTool('eraser')}
                        >
                          <Eraser className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        {colors.map((color, index) => (
                          <button
                            key={index}
                            className={`w-8 h-8 rounded-full border-2 ${
                              currentColor === color ? 'border-gray-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setCurrentColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium">Brush Size:</label>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={currentLineWidth}
                        onChange={(e) => setCurrentLineWidth(Number(e.target.value))}
                        className="w-24"
                      />
                      <span className="text-sm">{currentLineWidth}px</span>
                    </div>
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair bg-white touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  style={{ touchAction: 'none' }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Game Panel */}
          <div className="space-y-6">
            {/* Team Members (Team Mode) */}
            {gameMode === 'team' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[user?.name || 'You', ...teamMembers].map((member, index) => (
                      <div key={index} className={`p-2 rounded-lg flex items-center justify-between ${
                        member === currentPlayer ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50'
                      }`}>
                        <span className="font-medium">{member}</span>
                        {member === currentPlayer && (
                          <Badge variant="secondary">Drawing</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Guess Section */}
            {gameState === 'guessing' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Make Your Guess</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="What is being drawn?"
                    onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                  />
                  <Button onClick={handleGuess} className="w-full">
                    Submit Guess
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Game Controls */}
            {gameState === 'ended' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Round Complete!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center">The word was: <strong>{currentWord}</strong></p>
                  <Button onClick={nextRound} className="w-full">
                    Next Round
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Game Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Game Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Mode:</span>
                    <span className="font-medium">{gameMode === 'team' ? 'Team' : 'Solo'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Round:</span>
                    <span className="font-medium">{round}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Score:</span>
                    <span className="font-medium">{score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{timeLeft}s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScribbleGame;
