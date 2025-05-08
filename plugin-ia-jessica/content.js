// content.js

function createButton() {
  // Removida a verificação de URL para funcionar em qualquer site
  
  // Criar elemento de áudio único para o efeito sonoro
  const backgroundSound = document.createElement('audio');
  backgroundSound.src = 'https://gabrielfrangetto.github.io/Jess-Plugin/nyancatmusic.mp3'; // Som contínuo
  backgroundSound.preload = 'auto';
  backgroundSound.loop = true; // Fazer o som repetir continuamente
  
  // Criar elemento de imagem para mostrar após a conclusão
  const completionImage = document.createElement('img');
  completionImage.src = 'https://gabrielfrangetto.github.io/Jess-Plugin/nyan-cat.gif'; // Imagem de conclusão
  completionImage.style.position = 'fixed';
  completionImage.style.top = '50%';
  completionImage.style.left = '50%';
  completionImage.style.transform = 'translate(-50%, -50%)';
  completionImage.style.width = '100%'; // Aumentado em 50% (de 150px para 225px)
  completionImage.style.height = '100%'; // Aumentado em 50% (de 150px para 225px)
  completionImage.style.zIndex = '10001';
  completionImage.style.opacity = '0';
  completionImage.style.transition = 'opacity 1.0s ease-in-out'; // Aumentado o tempo de transição para um fade-in mais suave
  completionImage.style.pointerEvents = 'none'; // Evita que a imagem interfira com cliques
  document.body.appendChild(completionImage);
  
  // Função para mostrar a imagem de conclusão e controlar o som
  function showCompletionImage() {
    // Garantir que a imagem comece invisível
    completionImage.style.opacity = '0';
    
    // Forçar um reflow para garantir que a transição funcione
    void completionImage.offsetWidth;
    
    // Mostrar a imagem com transparência (efeito fade-in)
    completionImage.style.opacity = '1.0';
    
    // Esconder a imagem após 2 segundos e fazer fadeout do som
    setTimeout(() => {
      // Iniciar o fadeout da imagem
      completionImage.style.opacity = '0';
      
      // Iniciar o fadeout do som
      let volume = backgroundSound.volume;
      const fadeInterval = setInterval(() => {
        // Reduzir o volume gradualmente
        volume -= 0.1;
        if (volume <= 0) {
          // Quando o volume chegar a zero, parar o som e limpar o intervalo
          backgroundSound.pause();
          backgroundSound.currentTime = 0;
          clearInterval(fadeInterval);
        } else {
          // Atualizar o volume
          backgroundSound.volume = volume;
        }
      }, 100); // Ajustar a cada 100ms para um fadeout de aproximadamente 1 segundo
      
    }, 2000);
  }
  
  const button = document.createElement('button');
  
  // Criar imagem estática para o estado normal
  const catImage = document.createElement('img');
  catImage.src = 'https://i.postimg.cc/9FxfYXsH/nyan-cat-181.png';
  catImage.style.width = '30px';
  catImage.style.height = '30px';
  
  // Adicionar imagem estática como filho do botão
  button.appendChild(catImage);
  
  button.style.position = 'fixed';
  button.style.bottom = '15px';
  button.style.right = '15px';
  button.style.zIndex = 10000;
  button.style.width = '50px';
  button.style.height = '50px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#007bff';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.display = 'flex';
  button.style.justifyContent = 'center';
  button.style.alignItems = 'center';
  button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.2s ease';
  
  // Criar imagem GIF para substituir no hover
  const catGif = document.createElement('img');
  catGif.src = 'https://i.postimg.cc/nVGrMGkz/b0dacd0bb277315b8582d2d0e07d62a8.gif';
  catGif.style.width = '30px';
  catGif.style.height = '20px';
  catGif.style.display = 'none';
  
  // Adicionar GIF como filho do botão
  button.appendChild(catGif);
  
  // Adicionando eventos para o efeito de ampliação e troca de ícone
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.2)';
    button.style.boxShadow = '0 0 15px rgba(255, 183, 197, 0.7)';
    catImage.style.display = 'none'; // Esconder a imagem estática
    catGif.style.display = 'block'; // Mostrar o GIF
    
    // Iniciar o efeito RGB
    startRGBEffect();
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
    button.style.boxShadow = 'none';
    catImage.style.display = 'block'; // Mostrar a imagem estática
    catGif.style.display = 'none'; // Esconder o GIF
    
    // Restaurar a cor de fundo original (caso tenha sido clicado)
    button.style.backgroundColor = '#007bff';
    
    // Parar o efeito RGB
    stopRGBEffect();
  });
  
  // Variável para armazenar o ID do intervalo do efeito RGB
  let rgbIntervalId = null;
  
  // Função para iniciar o efeito RGB
  function startRGBEffect() {
    // Parar qualquer efeito anterior, se existir
    if (rgbIntervalId) {
      clearInterval(rgbIntervalId);
    }
    
    // Contador para o ângulo da cor HSL
    let hue = 0;
    
    // Atualizar a cor a cada 50ms
    rgbIntervalId = setInterval(() => {
      // Incrementar o ângulo da cor (0-360)
      hue = (hue + 5) % 360;
      
      // Aplicar a cor HSL ao botão
      button.style.backgroundColor = `hsl(${hue}, 100%, 75%)`;
      
      // Também atualizar a cor da sombra para combinar
      button.style.boxShadow = `0 0 15px hsl(${hue}, 100%, 65%)`;
    }, 50);
  }
  
  // Função para parar o efeito RGB
  function stopRGBEffect() {
    if (rgbIntervalId) {
      clearInterval(rgbIntervalId);
      rgbIntervalId = null;
    }
  }
  
  // Adicionando efeito visual de clique
  button.addEventListener('mousedown', () => {
    // Efeito visual de clique - reduzir tamanho e mudar cor
    button.style.transform = 'scale(0.9)';
    button.style.backgroundColor = '#ff8fa3'; // Cor mais escura ao clicar
    button.style.boxShadow = '0 0 8px rgba(255, 143, 163, 0.9)';
  });
  
  button.addEventListener('mouseup', () => {
    // Restaurar aparência após o clique
    if (document.querySelector(':hover') === button) {
      // Se ainda estiver com hover, voltar para o estado de hover
      button.style.transform = 'scale(1.2)';
      button.style.backgroundColor = '#ffb7c5';
      button.style.boxShadow = '0 0 15px rgba(255, 183, 197, 0.7)';
    } else {
      // Caso contrário, voltar ao estado normal
      button.style.transform = 'scale(1)';
      button.style.backgroundColor = '#ffb7c5';
      button.style.boxShadow = 'none';
    }
  });
  
  // Adicionando efeito de Imagens Flutuantes ao Clicar no Botão
  
  function createFloatingImages() {
    // URLs das imagens
    const imageUrls = [
      'https://i.postimg.cc/DwJB20T2/95-959337-nyan-cat-rainbow-png.png',
      'https://i.postimg.cc/qB1tjGCF/pink-donut-cartoon-icon-png.webp',
      'https://i.postimg.cc/0j00BKDf/Star-Emojis-Background-PNG-Image.png'
    ];
    
    // Obter a posição do botão
    const buttonRect = button.getBoundingClientRect();
    const buttonTop = buttonRect.top;
    const buttonLeft = buttonRect.left;
    
    // Variável para controlar se o efeito está ativo
    let isEffectActive = true;
    
    // Função para criar uma única imagem flutuante
    function createSingleImage() {
      if (!isEffectActive) return;
      
      // Selecionar uma imagem aleatória
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      const imgUrl = imageUrls[randomIndex];
      
      // Criar elemento de imagem
      const floatingImg = document.createElement('img');
      floatingImg.src = imgUrl;
      floatingImg.style.position = 'fixed';
      floatingImg.style.width = '30px';
      floatingImg.style.height = '30px';
      floatingImg.style.zIndex = '9999';
      floatingImg.style.opacity = '1';
      floatingImg.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
      
      // Posicionar à esquerda do botão com um pouco de aleatoriedade
      floatingImg.style.left = (buttonLeft - 30 - Math.random() * 50) + 'px'; // 30-80px à esquerda
      floatingImg.style.top = (buttonTop - 20 + Math.random() * 40) + 'px'; // Variação vertical
      
      // Adicionar ao corpo do documento
      document.body.appendChild(floatingImg);
      
      // Aplicar animação após um pequeno delay
      setTimeout(() => {
        // Movimento para cima e para a esquerda
        const moveX = -50 - (Math.random() * 70); // Mais para a esquerda
        const moveY = -70 - (Math.random() * 50); // Para cima
        const rotate = (Math.random() * 360) - 180; // Rotação aleatória
        const scale = 0.8 + Math.random() * 0.5; // Variação de tamanho
        
        floatingImg.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${scale})`;
        floatingImg.style.opacity = '0';
      }, 10);
      
      // Remover o elemento após a animação
      setTimeout(() => {
        if (document.body.contains(floatingImg)) {
          document.body.removeChild(floatingImg);
        }
      }, 1500);
      
      // Agendar a próxima imagem em um intervalo aleatório
      if (isEffectActive) {
        const nextImageDelay = Math.random() * 200 + 50; // 50-250ms
        setTimeout(createSingleImage, nextImageDelay);
      }
    }
    
    // Iniciar o efeito
    createSingleImage();
    
    // Parar o efeito após 2 segundos
    setTimeout(() => {
      isEffectActive = false;
    }, 2000);
  }

  button.addEventListener('click', async (event) => {
    // Iniciar o som de fundo com volume total
    backgroundSound.volume = 1.0;
    backgroundSound.currentTime = 0;
    backgroundSound.play().catch(err => console.error('Erro ao tocar som de fundo:', err));
    
    // Criar imagens flutuantes a partir do botão
    createFloatingImages();
    
    // Obter o elemento ativo (input ou textarea) ou qualquer elemento editável
    const activeElement = document.activeElement;
    let inputElement = null;
    let isGoogleSheets = false;
    
    // Verificar se o elemento ativo é um input, textarea ou elemento editável
    if (activeElement && 
        (activeElement.tagName === 'INPUT' || 
         activeElement.tagName === 'TEXTAREA' || 
         activeElement.getAttribute('contenteditable') === 'true')) {
      inputElement = activeElement;
    } else {
      // Verificar se estamos no Google Sheets
      if (window.location.href.includes('docs.google.com/spreadsheets')) {
        isGoogleSheets = true;
        // Tentar encontrar o elemento de entrada de célula do Google Sheets
        inputElement = document.querySelector('.cell-input');
        
        // Se não encontrou, tentar encontrar o elemento de edição ativo
        if (!inputElement) {
          inputElement = document.querySelector('.editable.selected');
        }
        
        // Tentar outras classes comuns do Google Sheets
        if (!inputElement) {
          inputElement = document.querySelector('.active-cell-input') || 
                         document.querySelector('.waffle-formula-input') ||
                         document.querySelector('[role="textbox"]');
        }
      } else {
        // Se não houver elemento ativo, tentar encontrar o campo #mention-input (compatibilidade com plugchat)
        inputElement = document.querySelector('#mention-input');
      }
      
      // Se ainda não encontrou, procurar qualquer input ou textarea visível
      if (!inputElement) {
        const inputs = document.querySelectorAll('input[type="text"], textarea, [contenteditable="true"]');
        if (inputs.length > 0) {
          inputElement = inputs[0]; // Pegar o primeiro encontrado
        }
      }
    }

    if (!inputElement) {
      alert('Campo de texto não encontrado! Clique em um campo de texto antes de usar o botão.');
      return;
    }

    // Obter o texto do elemento, dependendo do tipo
    let originalText = '';
    if (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA') {
      originalText = inputElement.value;
    } else {
      originalText = inputElement.innerText || inputElement.textContent;
    }

    if (!originalText.trim()) {
      alert('Digite algo antes de melhorar a frase!');
      return;
    }

    const improvedText = await sendToAI(originalText);
    if (improvedText) {
      // Mostrar a imagem de conclusão (que também controlará o fadeout do som)
      showCompletionImage();
      
      // Definir o texto melhorado, dependendo do tipo de elemento
      if (isGoogleSheets) {
        try {
          // Método específico para Google Sheets
          
          // 1. Focar no elemento
          inputElement.focus();
          
          // 2. Limpar o conteúdo atual
          document.execCommand('selectAll', false, null);
          document.execCommand('delete', false, null);
          
          // 3. Inserir o novo texto
          document.execCommand('insertText', false, improvedText);
          
          // 4. Simular pressionar Enter com múltiplas abordagens
          
          // Abordagem 1: Usar KeyboardEvent com keyCode e key
          const enterEvent = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            keyCode: 13,
            which: 13,
            key: 'Enter',
            code: 'Enter'
          });
          inputElement.dispatchEvent(enterEvent);
          
          // Abordagem 2: Usar KeyboardEvent com código de tecla diferente
          setTimeout(() => {
            const enterEvent2 = new KeyboardEvent('keypress', {
              bubbles: true,
              cancelable: true,
              keyCode: 13,
              which: 13,
              key: 'Enter',
              code: 'Enter'
            });
            inputElement.dispatchEvent(enterEvent2);
          }, 50);
          
          // Abordagem 3: Usar dispatchEvent com evento keyup também
          setTimeout(() => {
            const enterEvent3 = new KeyboardEvent('keyup', {
              bubbles: true,
              cancelable: true,
              keyCode: 13,
              which: 13,
              key: 'Enter',
              code: 'Enter'
            });
            inputElement.dispatchEvent(enterEvent3);
          }, 100);
          
          // Abordagem 4: Clicar em outro lugar da página para confirmar a edição
          setTimeout(() => {
            // Tentar encontrar qualquer elemento clicável fora da célula
            const otherElement = document.querySelector('body');
            if (otherElement) {
              otherElement.click();
              
              // Voltar para a célula original após um breve intervalo
              setTimeout(() => {
                if (inputElement) {
                  inputElement.focus();
                }
              }, 100);
            }
          }, 150);
          
          // Abordagem 5: Usar o método blur() para tirar o foco do elemento
          setTimeout(() => {
            inputElement.blur();
          }, 200);
          
        } catch (e) {
          console.error('Erro ao aplicar texto no Google Sheets:', e);
          
          // Método de fallback usando clipboard e eventos de teclado
          try {
            // Salvar o conteúdo atual da área de transferência
            const originalClipboard = await navigator.clipboard.readText().catch(() => '');
            
            // Copiar o texto melhorado para a área de transferência
            await navigator.clipboard.writeText(improvedText);
            
            // Focar no elemento
            inputElement.focus();
            
            // Colar na célula
            document.execCommand('paste');
            
            // Simular Enter com várias abordagens
            const enterKeyCodes = [
              { event: 'keydown', delay: 50 },
              { event: 'keypress', delay: 100 },
              { event: 'keyup', delay: 150 }
            ];
            
            enterKeyCodes.forEach(({ event, delay }) => {
              setTimeout(() => {
                const keyEvent = new KeyboardEvent(event, {
                  bubbles: true,
                  cancelable: true,
                  keyCode: 13,
                  which: 13,
                  key: 'Enter',
                  code: 'Enter'
                });
                inputElement.dispatchEvent(keyEvent);
              }, delay);
            });
            
            // Tirar o foco do elemento após um tempo
            setTimeout(() => {
              inputElement.blur();
              
              // Restaurar a área de transferência original
              setTimeout(() => {
                navigator.clipboard.writeText(originalClipboard).catch(() => {});
              }, 100);
            }, 200);
          } catch (clipboardError) {
            console.error('Erro ao usar clipboard:', clipboardError);
          }
        }
      } else if (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA') {
        inputElement.value = improvedText;
        // Disparar eventos para inputs e textareas
        const inputEvent = new Event('input', { bubbles: true });
        const changeEvent = new Event('change', { bubbles: true });
        inputElement.dispatchEvent(inputEvent);
        inputElement.dispatchEvent(changeEvent);
      } else {
        inputElement.innerText = improvedText;
        // Disparar evento de input para elementos editáveis
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);
      }
    }
  });

  // Adicionar os elementos de áudio ao corpo do documento
  document.body.appendChild(backgroundSound);
  document.body.appendChild(button);
}

async function sendToAI(text) {
  try {
    const response = await fetch('https://backend-plugin-ai.onrender.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      alert('Erro ao se conectar com a IA.');
      return null;
    }

    const data = await response.json();
    return data.result.trim();
  } catch (error) {
    console.error('Erro na comunicação com o servidor:', error);
    alert('Ocorreu um erro ao processar sua solicitação.');
    return null;
  }
}



createButton();