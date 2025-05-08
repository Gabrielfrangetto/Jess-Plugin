function createButton() {
  // Removida a verificação de URL para funcionar em qualquer site
  
  // Criar elemento de áudio único para o efeito sonoro
  const backgroundSound = document.createElement('audio');
  backgroundSound.src = 'https://gabrielfrangetto.github.io/Pluginextras/nyancatmusic.mp3'; // Som contínuo
  backgroundSound.preload = 'auto';
  backgroundSound.loop = true; // Fazer o som repetir continuamente
  
  // Criar elemento de imagem para mostrar após a conclusão
  const completionImage = document.createElement('img');
  completionImage.src = 'https://gabrielfrangetto.github.io/Pluginextras/nyan-cat.gif'; // Imagem de conclusão
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
  catImage.src = 'https://gabrielfrangetto.github.io/Pluginextras/pixelated-nyan-cat-2fvhnor9105pzhkp.png';
  catImage.style.width = '30px';
  catImage.style.height = '19px';
  
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
  button.style.touchAction = 'none'; // Impede comportamentos padrão de toque
  
  // Criar imagem GIF para substituir no hover
  const catGif = document.createElement('img');
  catGif.src = 'https://gabrielfrangetto.github.io/Pluginextras/OriginalNyan-ezgif.com-webp-to-gif-converter.gif';
  catGif.style.width = '30px';
  catGif.style.height = '20px';
  catGif.style.display = 'none';
  
  // Adicionar GIF como filho do botão
  button.appendChild(catGif);
  
  // Variáveis para controlar o arrasto
  let isDragging = false;
  let dragStartX, dragStartY;
  let initialLeft, initialTop;
  let buttonRect;
  let dragThreshold = 5; // Limiar em pixels para considerar como arrasto
  let dragDistance = 0; // Distância percorrida durante o arrasto
  
  // Função para iniciar o arrasto
  function startDrag(e) {
    // Prevenir comportamento padrão apenas se for um evento de mouse
    if (e.type === 'mousedown') {
      e.preventDefault();
    }
    
    // Obter posição atual do botão
    buttonRect = button.getBoundingClientRect();
    
    // Converter posição right/bottom para left/top para facilitar o cálculo
    initialLeft = window.innerWidth - buttonRect.right;
    initialTop = window.innerHeight - buttonRect.bottom;
    
    // Obter posição inicial do cursor/toque
    if (e.type === 'touchstart') {
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
    } else {
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    }
    
    // Inicializar a distância de arrasto
    dragDistance = 0;
    
    // Definir como potencial arrasto (será confirmado em doDrag)
    isDragging = false;
    
    // Desativar transição durante o arrasto para movimento mais suave
    button.style.transition = 'opacity 0.2s ease';
  }
  
  // Função para realizar o arrasto
  function doDrag(e) {
    // Se o botão do mouse não estiver pressionado, não fazer nada
    if (e.type === 'mousemove' && e.buttons === 0) {
      endDrag();
      return;
    }
    
    // Se não temos as coordenadas iniciais, não fazer nada
    if (typeof dragStartX === 'undefined' || typeof dragStartY === 'undefined') {
      return;
    }
    
    // Prevenir comportamento padrão
    e.preventDefault();
    
    let currentX, currentY;
    
    // Obter posição atual do cursor/toque
    if (e.type === 'touchmove') {
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
    } else {
      currentX = e.clientX;
      currentY = e.clientY;
    }
    
    // Calcular a distância percorrida
    const deltaX = currentX - dragStartX;
    const deltaY = currentY - dragStartY;
    dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Se a distância for maior que o limiar, considerar como arrasto
    if (dragDistance > dragThreshold) {
      isDragging = true;
      
      // Adicionar classe visual para indicar que está arrastando
      button.style.opacity = '0.8';
      button.style.cursor = 'grabbing';
      
      // Calcular nova posição (convertendo de right/bottom para left/top)
      const newRight = Math.max(0, initialLeft - deltaX);
      const newBottom = Math.max(0, initialTop - deltaY);
      
      // Limitar a posição para não sair da tela
      const maxRight = window.innerWidth - buttonRect.width;
      const maxBottom = window.innerHeight - buttonRect.height;
      
      button.style.right = `${Math.min(newRight, maxRight)}px`;
      button.style.bottom = `${Math.min(newBottom, maxBottom)}px`;
      button.style.left = 'auto'; // Garantir que left não interfira
      button.style.top = 'auto';  // Garantir que top não interfira
    }
  }
  
  // Função para finalizar o arrasto
  function endDrag() {
    // Se foi considerado um arrasto, salvar a posição
    if (isDragging) {
      // Restaurar aparência
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
      button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.2s ease, opacity 0.2s ease';
      
      // Salvar a posição final no localStorage
      saveButtonPosition();
    }
    
    // Resetar as variáveis de controle
    isDragging = false;
    dragStartX = undefined;
    dragStartY = undefined;
    dragDistance = 0;
  }
  
  // Função para salvar a posição do botão no localStorage
  function saveButtonPosition() {
    const position = {
      right: button.style.right,
      bottom: button.style.bottom
    };
    localStorage.setItem('nyanCatButtonPosition', JSON.stringify(position));
  }
  
  // Função para carregar a posição salva do botão
  function loadButtonPosition() {
    const savedPosition = localStorage.getItem('nyanCatButtonPosition');
    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition);
        button.style.right = position.right || '15px';
        button.style.bottom = position.bottom || '15px';
      } catch (e) {
        console.error('Erro ao carregar posição do botão:', e);
      }
    }
  }
  
  // Adicionar eventos para arrastar com mouse
  button.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', doDrag);
  document.addEventListener('mouseup', endDrag);
  
  // Adicionar eventos para arrastar com toque (dispositivos móveis)
  button.addEventListener('touchstart', startDrag, { passive: false });
  document.addEventListener('touchmove', doDrag, { passive: false });
  document.addEventListener('touchend', endDrag);
  document.addEventListener('touchcancel', endDrag);
  
  // Adicionando eventos para o efeito de ampliação e troca de ícone
  button.addEventListener('mouseenter', () => {
    if (!isDragging) { // Só aplicar efeito hover se não estiver arrastando
      button.style.transform = 'scale(1.2)';
      button.style.boxShadow = '0 0 15px rgba(255, 183, 197, 0.7)';
      catImage.style.display = 'none'; // Esconder a imagem estática
      catGif.style.display = 'block'; // Mostrar o GIF
      
      // Iniciar o efeito RGB
      startRGBEffect();
    }
  });
  
  button.addEventListener('mouseleave', () => {
    if (!isDragging) { // Só aplicar efeito hover se não estiver arrastando
      button.style.transform = 'scale(1)';
      button.style.boxShadow = 'none';
      catImage.style.display = 'block'; // Mostrar a imagem estática
      catGif.style.display = 'none'; // Esconder o GIF
      
      // Restaurar a cor de fundo original (caso tenha sido clicado)
      button.style.backgroundColor = '#007bff';
      
      // Parar o efeito RGB
      stopRGBEffect();
    }
  });
  
  // Modificar o evento de clique para verificar se não está arrastando
  button.addEventListener('click', async (event) => {
    // Só processar o clique se não foi considerado um arrasto
    if (!isDragging && dragDistance < dragThreshold) {
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
    }});

    // Adicionar os elementos de áudio ao corpo do documento
    document.body.appendChild(backgroundSound);
    document.body.appendChild(button);
}

async function sendToAI(text) {
  console.log("🔄 Enviando para IA:", text); // Debug

  try {
    const response = await fetch('https://backend-plugin-ai.onrender.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        plugin: 'jessica' // 👈 altere aqui conforme o plugin
      })
    });

    console.log("📨 Status da resposta:", response.status);

    if (!response.ok) {
      const erro = await response.text();
      console.error("❌ Erro recebido:", erro);
      alert('Erro ao se conectar com a IA.');
      return null;
    }

    const data = await response.json();
    console.log("✅ Resposta da IA:", data);
    return data.result.trim();
  } catch (error) {
    console.error('⚠️ Erro na comunicação com o servidor:', error);
    alert('Ocorreu um erro ao processar sua solicitação.');
    return null;
  }
}

createButton();
const currentVersion = chrome.runtime.getManifest().version;

async function checkForUpdate() {
  if (sessionStorage.getItem('updatePromptShown')) return;

  try {
    const res = await fetch("https://backend-plugin-ai.onrender.com/versionjess.json");
    const data = await res.json();

    if (compareVersions(data.version, currentVersion) > 0) {
      showUpdatePrompt(data.version, data.changelog, data.download_url);
      sessionStorage.setItem('updatePromptShown', 'true');
    }
  } catch (e) {
    console.warn("Erro ao verificar versão:", e);
  }
}

function compareVersions(v1, v2) {
  const a = v1.split('.').map(Number);
  const b = v2.split('.').map(Number);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] || 0) - (b[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function showUpdatePrompt(version, changelog, downloadUrl) {
  // Verifica se já existe o prompt e evita duplicação
  if (document.getElementById("plugin-update-box")) return;

  const updateBox = document.createElement("div");
  updateBox.id = "plugin-update-box"; // ID para controle
  updateBox.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 12px;
    padding: 16px;
    max-width: 320px;
    z-index: 999999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    font-family: sans-serif;
  `;

  updateBox.innerHTML = `
    <strong>🔄 Nova versão disponível (${version})</strong>
    <p style="white-space: pre-wrap;">${changelog}</p>
    <button id="baixarAtualizacao" style="margin-top: 8px; padding: 6px 12px; background: #007bff; color: #fff; border: none; border-radius: 8px; cursor: pointer;">
      Baixar nova versão
    </button>
    <button id="fecharAtualizacao" style="margin-top: 6px; padding: 4px 12px; background: transparent; color: #333; border: none; cursor: pointer;">
      Fechar
    </button>
  `;

  // Adiciona corretamente ao body
  document.body.appendChild(updateBox);

  // Ações dos botões
  document.getElementById("baixarAtualizacao").onclick = () => {
    window.open(downloadUrl, "_blank");
    updateBox.remove();
  };

  document.getElementById("fecharAtualizacao").onclick = () => {
    updateBox.remove();
  };
}


// Inicia verificação ao carregar a página
checkForUpdate();
