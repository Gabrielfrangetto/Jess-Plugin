function createButton() {
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
  
  // Criar imagem GIF para substituir no hover
  const catGif = document.createElement('img');
  catGif.src = 'https://gabrielfrangetto.github.io/Pluginextras/OriginalNyan-ezgif.com-webp-to-gif-converter.gif';
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
  
  // Função para criar uma imagem flutuante
  function createFloatingImages() {
    const imageUrls = [
      'https://gabrielfrangetto.github.io/Pluginextras/4-2-rainbow-nyan-cat-png-clipart.png',
      'https://gabrielfrangetto.github.io/Pluginextras/star8bit.png',
      'https://gabrielfrangetto.github.io/Pluginextras/donut8bit.png'
    ];
    
    const buttonRect = button.getBoundingClientRect();
    const buttonTop = buttonRect.top;
    const buttonLeft = buttonRect.left;
    
    let isEffectActive = true;
    
    function createSingleImage() {
      if (!isEffectActive) return;
      
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      const imgUrl = imageUrls[randomIndex];
      
      const floatingImg = document.createElement('img');
      floatingImg.src = imgUrl;
      floatingImg.style.position = 'fixed';
      floatingImg.style.width = '30px';
      floatingImg.style.height = '30px';
      floatingImg.style.zIndex = '9999';
      floatingImg.style.opacity = '1';
      floatingImg.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
      
      floatingImg.style.left = (buttonLeft - 30 - Math.random() * 50) + 'px';
      floatingImg.style.top = (buttonTop - 20 + Math.random() * 40) + 'px';
      
      document.body.appendChild(floatingImg);
      
      setTimeout(() => {
        const moveX = -50 - (Math.random() * 70);
        const moveY = -70 - (Math.random() * 50);
        const rotate = (Math.random() * 360) - 180;
        const scale = 0.8 + Math.random() * 0.5;
        
        floatingImg.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${scale})`;
        floatingImg.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        if (document.body.contains(floatingImg)) {
          document.body.removeChild(floatingImg);
        }
      }, 1500);
      
      if (isEffectActive) {
        const nextImageDelay = Math.random() * 200 + 50;
        setTimeout(createSingleImage, nextImageDelay);
      }
    }
    
    createSingleImage();
    
    setTimeout(() => {
      isEffectActive = false;
    }, 2000);
  }

  const dragHandle = document.createElement('div');
  dragHandle.style.width = '20px';
  dragHandle.style.height = '20px';
  dragHandle.style.position = 'absolute';
  dragHandle.style.top = '0';
  dragHandle.style.right = '0';
  dragHandle.style.cursor = 'grab';
  dragHandle.style.backgroundColor = '#fff';
  dragHandle.style.borderRadius = '50%';
  button.appendChild(dragHandle);
  
  button.addEventListener('click', async (event) => {
    if (event.target === dragHandle) return; // Evitar conflito com o arrasto
    
    backgroundSound.volume = 1.0;
    backgroundSound.currentTime = 0;
    backgroundSound.play().catch(err => console.error('Erro ao tocar som de fundo:', err));
    
    createFloatingImages();
    button.style.position = 'fixed';
    document.body.appendChild(button);
  });

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
