const GetWord = async()=>{
    const response = await fetch('https://raw.githubusercontent.com/droyson/go-fetch-words/refs/heads/main/5-letter-words.json');
    const words = await response.json();
    console.log
  }
  const solution = GetWord();
  console.log(solution);