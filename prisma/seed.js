import { prisma } from "../lib/prisma.js"; 

async function main() { 
  const quiz = await prisma.quiz.create({
     data: { title: "General Knowledge Quiz",
       question: {
         create: [
                  { question: "What is the capital city of France?",
                    optionA: "London",
                    optionB: "Paris",
                    optionC: "Rome",
                    optionD: "Berlin",
                    answer: "Paris", 
                  }, 
                  { 
                    question: "Which planet is known as the Red Planet?",
                    optionA: "Venus",
                    optionB: "Jupiter",
                    optionC: "Mars",
                    optionD: "Mercury",
                    answer: "Mars",
                  },
                  {
                    question: "How many continents are there in the world?", optionA: "5",
                    optionB: "6",
                    optionC: "7",
                    optionD: "8",
                    answer: "7", 
                  }, 
                  { 
                    question: "Who wrote Romeo and Juliet?",
                    optionA: "William Shakespeare",
                    optionB: "Charles Dickens",
                    optionC: "Mark Twain",
                    optionD: "Jane Austen",
                    answer: "William Shakespeare", 
                  },
                  { 
                    question: "What is the largest ocean on Earth?",
                    optionA: "Atlantic Ocean",
                    optionB: "Indian Ocean",
                    optionC: "Arctic Ocean",
                    optionD: "Pacific Ocean",
                    answer: "Pacific Ocean",
                  }, 
                  {
                    question: "Which country is known for the Great Wall?",
                    optionA: "Japan",
                    optionB: "China",
                    optionC: "South Korea",
                    optionD: "Thailand",
                    answer: "China", 
                  },
                  { 
                    question: "What is the chemical symbol for gold?",
                    optionA: "Ag",
                    optionB: "Fe",
                    optionC: "Au",
                    optionD: "Cu",
                    answer: "Au", 
                  },
                  {
                    question: "How many days are there in a leap year?",
                    optionA: "364",
                    optionB: "365",
                    optionC: "366",
                    optionD: "367",
                    answer: "366",
                  },
                  { 
                    question: "Which is the largest land animal?",
                    optionA: "Giraffe",
                    optionB: "Elephant",
                    optionC: "Hippopotamus",
                    optionD: "Rhinoceros",
                    answer: "Elephant", 
                  },
                  { question: "What is the main language spoken in Brazil?",
                    optionA: "Spanish",
                    optionB: "Portuguese",
                    optionC: "French",
                    optionD: "English",
                    answer: "Portuguese",
                  },
                 ]
                },
               },
             }); 
             
            console.log(`Created quiz: ${quiz.title}`);
         } main() .catch((error) => { console.error(error); process
        exit(1); }) .finally(async () => { await prisma.$disconnect(); });