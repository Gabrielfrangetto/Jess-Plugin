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
    // Verificar se a imagem deve aparecer (10% de chance)
    const shouldShowImage = Math.random() <= 0.1; // 10% de chance
    
    if (!shouldShowImage) {
      return; // Não mostrar a imagem nem tocar o som
    }
    
    // Tocar o som de fundo apenas se a imagem for mostrada
    backgroundSound.volume = 1.0;
    backgroundSound.currentTime = 0;
    backgroundSound.play().catch(err => console.error('Erro ao tocar som de fundo:', err));
    
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
  
  // Definir tamanho padrão para o botão (consistente em todas as abas)
  const BUTTON_SIZE = 55; // Tamanho em pixels
  
  button.style.position = 'fixed';
  button.style.bottom = '15px';
  button.style.right = '15px';
  button.style.zIndex = 10000;
  button.style.width = BUTTON_SIZE + 'px'; // Usar width em vez de minWidth
  button.style.height = BUTTON_SIZE + 'px'; // Usar height em vez de minHeight
  button.style.minWidth = 'unset'; // Remover minWidth para evitar conflitos
  button.style.minHeight = 'unset'; // Remover minHeight para evitar conflitos
  button.style.maxWidth = BUTTON_SIZE + 'px'; // Adicionar maxWidth para garantir tamanho fixo
  button.style.maxHeight = BUTTON_SIZE + 'px'; // Adicionar maxHeight para garantir tamanho fixo
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#007bff';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.display = 'flex';
  button.style.justifyContent = 'center';
  button.style.alignItems = 'center';
  button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.2s ease';
  button.style.padding = '0'; // Remover padding para evitar que afete o tamanho
  button.style.margin = '0'; // Remover margin para evitar que afete o tamanho
  button.style.boxSizing = 'border-box'; // Garantir que padding e border não aumentem o tamanho
  button.style.overflow = 'hidden'; // Evitar que o conteúdo ultrapasse o tamanho definido
  
  // Adicionar !important para sobrescrever estilos de sites externos
  button.setAttribute('style', button.getAttribute('style') + ' width: ' + BUTTON_SIZE + 'px !important; height: ' + BUTTON_SIZE + 'px !important;');
  
  // --- HANDLE DE ARRASTAR ---
  // Criar o handle como um elemento separado fora do botão
  const dragHandle = document.createElement('div');
  
  // Definir tamanho maior para o handle
  const HANDLE_SIZE = 25; // Aumentado para melhor usabilidade
  
  // Configurar estilos do handle
  dragHandle.style.position = 'absolute';
  dragHandle.style.top = '-25px'; // Aumentado para ficar mais acima
  dragHandle.style.left = '50%';
  dragHandle.style.transform = 'translateX(-50%)';
  dragHandle.style.width = HANDLE_SIZE + 'px';
  dragHandle.style.height = HANDLE_SIZE + 'px';
  dragHandle.style.background = '#007bff';
  dragHandle.style.borderRadius = '50%';
  dragHandle.style.border = '2px solid #fff';
  dragHandle.style.cursor = 'grab';
  dragHandle.style.zIndex = '10002';
  dragHandle.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
  dragHandle.style.display = 'flex';
  dragHandle.style.justifyContent = 'center';
  dragHandle.style.alignItems = 'center';
  dragHandle.title = 'Arraste para mover';
  // Adicionar propriedades para animação e visibilidade
  dragHandle.style.opacity = '0';
  dragHandle.style.transition = 'opacity 0.3s ease';
  dragHandle.style.pointerEvents = 'none'; // Inicialmente desativado
  
  // Substituir o SVG pela imagem fornecida
  const handleImage = document.createElement('img');
  handleImage.src = 'https://gabrielfrangetto.github.io/Pluginextras/784344.png';
  handleImage.style.width = '100%';
  handleImage.style.height = '100%';
  handleImage.style.objectFit = 'contain';
  
  // Adicionar a imagem ao handle
  dragHandle.appendChild(handleImage);
  
  // Garantir que o handle não seja afetado por estilos externos
  dragHandle.setAttribute('style', 
    'position: fixed !important;' + // Mudado para fixed para melhor posicionamento
    'top: -25px !important;' + // Aumentado para ficar mais acima
    'left: 50% !important;' +
    'transform: translateX(-50%) !important;' +
    'width: ' + HANDLE_SIZE + 'px !important;' +
    'height: ' + HANDLE_SIZE + 'px !important;' +
    'background: #007bff !important;' + // Alterado para azul (#007bff)
    'border-radius: 50% !important;' +
    'border: 2px solid #fff !important;' +
    'cursor: grab !important;' +
    'z-index: 10002 !important;' +
    'box-shadow: 0 0 5px rgba(0, 0, 0, 0.3) !important;' +
    'display: flex !important;' +
    'justify-content: center !important;' +
    'align-items: center !important;' +
    'opacity: 0 !important;' + // Inicialmente invisível
    'transition: opacity 0.3s ease !important;' + // Transição suave
    'pointer-events: none !important;' + // Inicialmente desativado
    'box-sizing: border-box !important;' + // Garantir que padding e border não afetem o tamanho
    'padding: 0 !important;' + // Remover padding
    'margin: 0 !important;');
  
  // Adicionar o handle ao documento, não ao botão
  document.body.appendChild(dragHandle);
  
  // Aumentar a área de clique do handle para facilitar o uso
  dragHandle.style.width = '30px'; // Aumentado de 25px para 30px
  dragHandle.style.height = '30px'; // Aumentado de 25px para 30px
  
  // Atualizar o atributo style com !important para garantir que as alterações sejam aplicadas
  const handleStyleString = dragHandle.getAttribute('style');
  dragHandle.setAttribute('style', handleStyleString.replace('width: ' + HANDLE_SIZE + 'px', 'width: 30px')
                                                  .replace('height: ' + HANDLE_SIZE + 'px', 'height: 30px'));
  
  // Adicionar uma área de clique invisível maior ao redor do handle
  const handleHitArea = document.createElement('div');
  handleHitArea.style.position = 'fixed';
  handleHitArea.style.width = '40px';
  handleHitArea.style.height = '40px';
  handleHitArea.style.borderRadius = '50%';
  handleHitArea.style.backgroundColor = 'transparent';
  handleHitArea.style.zIndex = '10001'; // Abaixo do handle, mas acima de outros elementos
  handleHitArea.style.pointerEvents = 'none'; // Inicialmente desativado
  document.body.appendChild(handleHitArea);
  
  // Função para atualizar a posição da área de clique junto com o handle
  function updateHitAreaPosition() {
    const handleRect = dragHandle.getBoundingClientRect();
    handleHitArea.style.left = (handleRect.left - 5) + 'px';
    handleHitArea.style.top = (handleRect.top - 5) + 'px';
  }
  
  // Atualizar a função updateHandlePosition para incluir a área de clique
  const originalUpdateHandlePosition = updateHandlePosition;
  updateHandlePosition = function() {
    originalUpdateHandlePosition();
    updateHitAreaPosition();
  };
  
  // Função para atualizar a posição do handle quando o botão se move
  function updateHandlePosition() {
    const rect = button.getBoundingClientRect();
    // Posicionar o handle no centro superior do botão
    dragHandle.style.position = 'fixed';
    dragHandle.style.left = (rect.left + rect.width / 2) + 'px';
    dragHandle.style.top = (rect.top - 15) + 'px'; // Ajustado para ficar mais próximo do botão
    
    // Forçar o handle a manter sua posição relativa ao botão
    dragHandle.style.transform = 'translateX(-50%)';
  }
  
  // Atualizar posição inicial do handle
  setTimeout(updateHandlePosition, 100);
  
  // Adicionar listener para o evento de scroll para manter o handle alinhado com o botão
  window.addEventListener('scroll', updateHandlePosition);
  
  // Adicionar listener para o evento de redimensionamento da janela
  window.addEventListener('resize', updateHandlePosition);
  
  // Também aplicar o mesmo comportamento à área de clique maior
  handleHitArea.addEventListener('mouseenter', () => {
    isMouseOverHandle = true;
    clearTimeout(handleHideTimeout);
    
    // Garantir que o handle fique visível quando o mouse estiver sobre a área de clique
    dragHandle.style.opacity = '1';
    dragHandle.style.pointerEvents = 'auto';
  });
  
  handleHitArea.addEventListener('mouseleave', (event) => {
    handleHideTimeout = setTimeout(() => {
      isMouseOverHandle = false;
      
      // Verificar se o mouse também não está sobre o botão e não estamos arrastando
      const elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);
      const isMouseOverButton = elementUnderMouse === button || button.contains(elementUnderMouse);
      
      if (!isMouseOverButton && !isDragging && !dragHandle.contains(elementUnderMouse)) {
        // Se o mouse não estiver sobre o botão nem sobre o handle, esconder o handle
        dragHandle.style.opacity = '0';
        dragHandle.style.pointerEvents = 'none'; // Desabilitar interação
        handleHitArea.style.pointerEvents = 'none'; // Desabilitar a área de clique maior
      }
    }, 300);
  });
  
  // Carregar posição salva do localStorage (se existir)
  try {
    const savedPosition = localStorage.getItem('nyanCatButtonPosition');
    if (savedPosition) {
      const position = JSON.parse(savedPosition);
      button.style.left = position.left + 'px';
      button.style.top = position.top + 'px';
      button.style.right = 'auto';
      button.style.bottom = 'auto';
      
      // Atualizar a posição do handle também
      setTimeout(updateHandlePosition, 100);
    }
  } catch (e) {
    console.error('Erro ao carregar posição do botão:', e);
  }
  
  // Adicionar listener para o evento 'storage' para sincronizar entre abas
  window.addEventListener('storage', function(e) {
    console.log('Evento storage detectado:', e.key, e.newValue);
    
    // Verificar se é uma atualização de posição (final ou em tempo real)
    if (e.key === 'nyanCatButtonPosition' || e.key === 'nyanCatButtonPosition_realtime') {
      try {
        if (e.newValue) {
          const position = JSON.parse(e.newValue);
          
          // Atualizar a posição do botão
          button.style.left = position.left + 'px';
          button.style.top = position.top + 'px';
          button.style.right = 'auto';
          button.style.bottom = 'auto';
          
          // Atualizar a posição do handle também
          updateHandlePosition();
          
          console.log('Posição atualizada via evento storage:', position);
        }
      } catch (e) {
        console.error('Erro ao processar evento de storage:', e);
      }
    }
  });
  
  // --- LÓGICA DE ARRASTAR ---
  let isDragging = false;
  let dragStarted = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  
  // Variável para controlar a frequência de atualizações
  let lastUpdateTime = 0;
  const UPDATE_INTERVAL = 50; // Atualizar a cada 50ms durante o arrasto
  
  dragHandle.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragStarted = false;
    dragHandle.style.cursor = 'grabbing';
    
    // Calcular o offset em relação ao botão, não ao handle
    const buttonRect = button.getBoundingClientRect();
    dragOffsetX = e.clientX - buttonRect.left;
    dragOffsetY = e.clientY - buttonRect.top;
    
    // Garantir que o handle permaneça visível durante o arrasto
    dragHandle.style.opacity = '1';
    dragHandle.style.pointerEvents = 'auto';
    handleHitArea.style.pointerEvents = 'auto';
    
    // Limpar qualquer timeout pendente
    clearTimeout(handleHideTimeout);
    
    // Adicionar uma classe ao body para indicar que estamos arrastando
    document.body.classList.add('nyan-cat-dragging');
    
    e.preventDefault();
    e.stopPropagation();
  });
  
  // Permitir que a área de clique maior também inicie o arrasto
  handleHitArea.addEventListener('mousedown', function(e) {
    // Simular clique no handle real
    const mouseEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX,
      clientY: e.clientY
    });
    dragHandle.dispatchEvent(mouseEvent);
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      dragStarted = true;
      
      // Calcular nova posição
      let newLeft = e.clientX - dragOffsetX;
      let newTop = e.clientY - dragOffsetY;
      
      // Limitar a posição dentro da janela visível
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Garantir que o botão esteja sempre visível na tela
      newLeft = Math.min(Math.max(newLeft, 0), windowWidth - BUTTON_SIZE);
      newTop = Math.min(Math.max(newTop, 0), windowHeight - BUTTON_SIZE);
      
      button.style.left = newLeft + 'px';
      button.style.top = newTop + 'px';
      button.style.right = 'auto';
      button.style.bottom = 'auto';
      
      // Atualizar a posição do handle junto com o botão
      updateHandlePosition();
      
      // Sincronizar em tempo real com outras abas (com limitação de frequência)
      const currentTime = Date.now();
      if (currentTime - lastUpdateTime > UPDATE_INTERVAL) {
        lastUpdateTime = currentTime;
        
        try {
          const position = {
            left: newLeft,
            top: newTop,
            timestamp: currentTime
          };
          
          // Usar um nome de chave diferente para atualizações em tempo real
          // Primeiro remover para garantir que o evento seja disparado mesmo se o valor for o mesmo
          localStorage.removeItem('nyanCatButtonPosition_realtime');
          
          // Forçar um pequeno atraso antes de definir o novo valor
          setTimeout(() => {
            localStorage.setItem('nyanCatButtonPosition_realtime', JSON.stringify(position));
            console.log('Posição sincronizada em tempo real:', position);
          }, 5);
        } catch (e) {
          console.error('Erro ao sincronizar posição em tempo real:', e);
        }
      }
    }
  });
  
  document.addEventListener('mouseup', function(event) {
    if (isDragging) {
      isDragging = false;
      dragHandle.style.cursor = 'grab';
      
      // Remover a classe de arrasto
      document.body.classList.remove('nyan-cat-dragging');
      
      // Verificar se o mouse ainda está sobre o botão ou o handle
      const elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);
      const isOverButton = elementUnderMouse === button || 
                          (button.contains && button.contains(elementUnderMouse));
      const isOverHandle = elementUnderMouse === dragHandle || 
                          (dragHandle.contains && dragHandle.contains(elementUnderMouse)) ||
                          elementUnderMouse === handleHitArea || 
                          (handleHitArea && handleHitArea.contains && handleHitArea.contains(elementUnderMouse));
      
      // Atualizar as variáveis de rastreamento
      isMouseOverButton = isOverButton;
      isMouseOverHandle = isOverHandle;
      
      // Se o mouse não estiver sobre nenhum elemento, desativar os efeitos
      if (!isOverButton && !isOverHandle) {
        // Desativar os efeitos imediatamente após o arrasto
        disableAllEffects();
      }
      
      // Salvar a posição final no localStorage
      if (dragStarted) {
        try {
          const rect = button.getBoundingClientRect();
          const position = {
            left: rect.left,
            top: rect.top,
            timestamp: Date.now()
          };
          localStorage.setItem('nyanCatButtonPosition', JSON.stringify(position));
        } catch (e) {
          console.error('Erro ao salvar posição do botão:', e);
        }
      }
    }
  });
  
  // Adicionar um evento global para detectar quando o mouse sai da janela
  document.addEventListener('mouseleave', () => {
    // Se o mouse sair da janela, desativar todos os efeitos após um pequeno atraso
    effectsDisableTimeout = setTimeout(() => {
      isMouseOverButton = false;
      isMouseOverHandle = false;
      disableAllEffects();
    }, 200);
  });
  
  // --- SUPORTE PARA TOUCH (DISPOSITIVOS MÓVEIS) ---
  dragHandle.addEventListener('touchstart', function(e) {
    isDragging = true;
    dragStarted = false;
    dragHandle.style.cursor = 'grabbing';
    const rect = button.getBoundingClientRect();
    const touch = e.touches[0];
    dragOffsetX = touch.clientX - rect.left;
    dragOffsetY = touch.clientY - rect.top;
    e.preventDefault();
    e.stopPropagation();
  });
  
  document.addEventListener('touchmove', function(e) {
    if (isDragging) {
      dragStarted = true;
      const touch = e.touches[0];
      
      // Calcular nova posição
      let newLeft = touch.clientX - dragOffsetX;
      let newTop = touch.clientY - dragOffsetY;
      
      // Limitar a posição dentro da janela visível
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Garantir que o botão esteja sempre visível na tela
      newLeft = Math.min(Math.max(newLeft, 0), windowWidth - BUTTON_SIZE);
      newTop = Math.min(Math.max(newTop, 0), windowHeight - BUTTON_SIZE);
      
      button.style.left = newLeft + 'px';
      button.style.top = newTop + 'px';
      button.style.right = 'auto';
      button.style.bottom = 'auto';
      
      // Atualizar a posição do handle junto com o botão
      updateHandlePosition();
      
      // Sincronizar em tempo real com outras abas (com limitação de frequência)
      const currentTime = Date.now();
      if (currentTime - lastUpdateTime > UPDATE_INTERVAL) {
        lastUpdateTime = currentTime;
        
        try {
          const position = {
            left: newLeft,
            top: newTop,
            timestamp: currentTime
          };
          
          // Primeiro remover para garantir que o evento seja disparado
          localStorage.removeItem('nyanCatButtonPosition_realtime');
          
          // Forçar um pequeno atraso antes de definir o novo valor
          setTimeout(() => {
            localStorage.setItem('nyanCatButtonPosition_realtime', JSON.stringify(position));
            console.log('Posição sincronizada em tempo real (touch):', position);
          }, 5);
        } catch (e) {
          console.error('Erro ao sincronizar posição em tempo real (touch):', e);
        }
      }
    }
  });
  
  document.addEventListener('touchend', function() {
    if (isDragging) {
      isDragging = false;
      dragHandle.style.cursor = 'grab';
      
      // Salvar a posição final no localStorage
      if (dragStarted) {
        try {
          const rect = button.getBoundingClientRect();
          const position = {
            left: rect.left,
            top: rect.top,
            timestamp: Date.now()
          };
          localStorage.setItem('nyanCatButtonPosition', JSON.stringify(position));
        } catch (e) {
          console.error('Erro ao salvar posição do botão (touch):', e);
        }
      }
      
      // Esconder o handle após o arrasto em dispositivos touch
      dragHandle.style.opacity = '0';
      dragHandle.style.pointerEvents = 'none'; // Desabilitar interação
      
    }
  });
  
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
    
    // Mostrar o handle com animação de fade-in
    dragHandle.style.opacity = '1';
    dragHandle.style.pointerEvents = 'auto'; // Habilitar interação
    
    // Ativar também a área de clique maior
    handleHitArea.style.pointerEvents = 'auto';
    
    // Limpar qualquer timeout pendente
    clearTimeout(handleHideTimeout);
    
    // Iniciar o efeito RGB
    startRGBEffect();
  });
  
  // Variável para rastrear se o mouse está sobre o handle
  let isMouseOverHandle = false;
  
  // Adicionar eventos ao handle para rastrear quando o mouse está sobre ele
  dragHandle.addEventListener('mouseenter', () => {
    isMouseOverHandle = true;
    
    // Definir um estilo de cursor fixo para evitar o piscar
    dragHandle.style.cursor = 'grab';
    
    // Impedir que o handle desapareça quando o mouse estiver sobre ele
    clearTimeout(handleHideTimeout);
  });
  
  // Variável para armazenar o timeout de esconder o handle
  let handleHideTimeout;
  
  dragHandle.addEventListener('mouseleave', (event) => {
    // Não esconder o handle imediatamente, dar tempo para o usuário mover o mouse
    handleHideTimeout = setTimeout(() => {
      isMouseOverHandle = false;
      
      // Verificar se o mouse também não está sobre o botão e não estamos arrastando
      const elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);
      const isMouseOverButton = elementUnderMouse === button || button.contains(elementUnderMouse);
      
      if (!isMouseOverButton && !isDragging) {
        // Se o mouse não estiver sobre o botão nem sobre o handle, esconder o handle
        dragHandle.style.opacity = '0';
        dragHandle.style.pointerEvents = 'none'; // Desabilitar interação
        handleHitArea.style.pointerEvents = 'none'; // Desabilitar a área de clique maior
      }
    }, 300); // Aumentado para 300ms para dar mais tempo ao usuário
  });
  
  button.addEventListener('mouseleave', (event) => {
    // Verificar se o mouse está indo para o handle
    const elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);
    
    // Se o mouse estiver indo para o handle, não esconder o handle
    if (elementUnderMouse === dragHandle || isMouseOverHandle) {
      return;
    }
    
    button.style.transform = 'scale(1)';
    button.style.boxShadow = 'none';
    catImage.style.display = 'block'; // Mostrar a imagem estática
    catGif.style.display = 'none'; // Esconder o GIF
    
    // Esconder o handle com animação de fade-out (apenas se não estiver arrastando)
    if (!isDragging) {
      dragHandle.style.opacity = '0';
      dragHandle.style.pointerEvents = 'none'; // Desabilitar interação
    }
    
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
  
  // Função para parar o efeito RGB com fade-out suave
  function stopRGBEffect() {
    if (rgbIntervalId) {
      // Parar o efeito RGB
      clearInterval(rgbIntervalId);
      rgbIntervalId = null;
      
      // IMPORTANTE: Primeiro aplicar a transição ANTES de mudar a cor
      button.style.transition = 'background-color 0.5s ease, box-shadow 0.5s ease, transform 0.3s ease';
      
      // Forçar um reflow para garantir que a transição seja aplicada
      void button.offsetWidth;
      
      // Agora mudar a cor - a transição já está ativa
      button.style.backgroundColor = '#007bff';
      button.style.boxShadow = 'none';
      
      // Restaurar a transição original após o fade-out
      setTimeout(() => {
        button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.2s ease';
      }, 500);
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
      // Se não estiver com hover, voltar para o estado normal
      button.style.transform = 'scale(1)';
      button.style.backgroundColor = '#007bff';
      button.style.boxShadow = 'none';
    }
  });
  
  // Adicionar evento de clique específico para o botão
  button.addEventListener('click', (event) => {
    // Evitar que o clique propague para outros elementos
    event.stopPropagation();
    
    // Verificar se o botão não está sendo arrastado
    if (!dragStarted) {
      // Mostrar efeito visual de conclusão
      showCompletionImage();
    }
    
    // Resetar a flag de arrasto para o próximo clique
    dragStarted = false;
  });
  
  // Adicionando efeito de Imagens Flutuantes ao Clicar no Botão
  function createFloatingImages() {
    // URLs das imagens
    const imageUrls = [
      'https://gabrielfrangetto.github.io/Pluginextras/4-2-rainbow-nyan-cat-png-clipart.png',
      'https://gabrielfrangetto.github.io/Pluginextras/star8bit.png',
      'https://gabrielfrangetto.github.io/Pluginextras/donut8bit.png'
    ];
    
    // Obter a posição do botão
    const buttonRect = button.getBoundingClientRect();
    const buttonTop = buttonRect.top;
    const buttonLeft = buttonRect.left;
    
    // Variável global para controlar se o efeito está ativo
    window.isEffectActive = true;
    
    // Função para criar uma única imagem flutuante
    function createSingleImage() {
      if (!window.isEffectActive) return;
      
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
      if (window.isEffectActive) {
        const nextImageDelay = Math.random() * 200 + 50; // 50-250ms
        setTimeout(createSingleImage, nextImageDelay);
      }
    }
    
    // Iniciar o efeito
    createSingleImage();
    
    // Parar o efeito após 2 segundos
    setTimeout(() => {
      window.isEffectActive = false;
    }, 2000);
  }

  // Adicionar evento de clique ao botão para o Google Sheets
  button.addEventListener('click', () => {
    // Verificar se estamos no Google Sheets
    const isGoogleSheets = window.location.hostname.includes('docs.google.com') && 
                          window.location.pathname.includes('/spreadsheets/');
    
    if (isGoogleSheets) {
      // Verificar se há uma célula selecionada ou se estamos dentro de uma célula
      const activeElement = document.activeElement;
      const isInCell = activeElement && 
                      (activeElement.classList.contains('cell-input') || 
                       activeElement.classList.contains('waffle-cell-input'));
      
      // Verificar se há uma célula selecionada (mesmo que não esteja em edição)
      const selectedCell = document.querySelector('.cell-focus') || 
                          document.querySelector('.active-cell-border') ||
                          document.querySelector('.cell-selection');
      
      if (isInCell || selectedCell) {
        // Se estamos em uma célula ou há uma célula selecionada
        
        // Se estamos apenas com a célula selecionada (não em edição), simular um clique duplo
        if (!isInCell && selectedCell) {
          // Obter a célula selecionada
          const cellElement = selectedCell.closest('.grid-cell') || selectedCell;
          
          // Tentar simular um clique duplo na célula para entrar no modo de edição
          try {
            // Criar e disparar um evento de clique duplo
            const dblClickEvent = new MouseEvent('dblclick', {
              bubbles: true,
              cancelable: true,
              view: window
            });
            cellElement.dispatchEvent(dblClickEvent);
            
            // Pequeno atraso para garantir que a célula entre no modo de edição
            setTimeout(() => {
              // Agora mostrar a imagem de conclusão
              showCompletionImage();
            }, 100);
          } catch (e) {
            console.error('Erro ao simular clique duplo:', e);
            // Tentar mostrar a imagem mesmo assim
            showCompletionImage();
          }
        } else {
          // Se já estamos em edição, apenas mostrar a imagem
          showCompletionImage();
        }
      } else {
        // Se não houver célula selecionada, tentar encontrar a célula ativa
        try {
          const activeCell = document.querySelector('.active-cell-border');
          if (activeCell) {
            // Simular um clique na célula ativa
            const clickEvent = new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window
            });
            activeCell.dispatchEvent(clickEvent);
            
            // Depois simular um clique duplo
            setTimeout(() => {
              const dblClickEvent = new MouseEvent('dblclick', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              activeCell.dispatchEvent(dblClickEvent);
              
              // Mostrar a imagem após um pequeno atraso
              setTimeout(showCompletionImage, 100);
            }, 50);
          } else {
            // Se não encontrar nenhuma célula, mostrar a imagem mesmo assim
            showCompletionImage();
          }
        } catch (e) {
          console.error('Erro ao interagir com célula:', e);
          showCompletionImage();
        }
      }
    } else {
      // Para outros sites, executar normalmente
      showCompletionImage();
    }
  });
  
  // Evento de clique principal
  button.addEventListener('click', async (event) => {
    // Se o clique foi no handle de arrastar ou se foi arrasto, não ativa IA
    if (event.target === dragHandle || isDragging || dragStarted) {
      return;
    }
    
    // Verificar se já existe uma chamada em andamento
    if (button.dataset.isProcessing === 'true') {
      console.log('Já existe uma chamada em andamento, ignorando clique');
      return;
    }
    
    // Marcar que uma chamada está em andamento
    button.dataset.isProcessing = 'true';
    
    try {
      // Criar imagens flutuantes a partir do botão
      createFloatingImages();
      
      // Mostrar a imagem de conclusão (com 10% de chance)
      showCompletionImage();
      
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
          // Verificar se há uma célula selecionada ou se estamos dentro de uma célula
          const isInCell = activeElement && 
                          (activeElement.classList.contains('cell-input') || 
                           activeElement.classList.contains('waffle-cell-input') ||
                           activeElement.closest('.cell-selection') ||
                           document.querySelector('.cell-focus') ||
                           document.querySelector('.active-cell-border'));
          
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
        // Parar efeitos em caso de erro
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        window.isEffectActive = false;
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
        // Parar efeitos em caso de erro
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        window.isEffectActive = false;
        return;
      }

      const improvedText = await sendToAI(originalText);
      if (improvedText) {
        // Mostrar a imagem de conclusão (que também controlará o fadeout do som)
        showCompletionImage();
        
        // Parar o efeito RGB
        stopRGBEffect();
        
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
      } else {
        // Parar efeitos em caso de erro na requisição da IA
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        window.isEffectActive = false;
        completionImage.style.opacity = '0';
      }
    } catch (error) {
      console.error('Erro durante o processamento do clique:', error);
      alert('Ocorreu um erro ao processar sua solicitação.');
      
      // Parar efeitos em caso de erro
      backgroundSound.pause();
      backgroundSound.currentTime = 0;
      window.isEffectActive = false;
      completionImage.style.opacity = '0';
    } finally {
      // Sempre limpar o flag de processamento quando terminar
      setTimeout(() => {
        button.dataset.isProcessing = 'false';
      }, 500); // Pequeno atraso para evitar cliques múltiplos acidentais
    }
  });

  // Adicionar os elementos de áudio ao corpo do documento
  document.body.appendChild(backgroundSound);
  document.body.appendChild(button);
}

async function sendToAI(text) {
  console.log("🔄 Enviando para IA:", text); // Debug

  try {
    // Adicionar timeout para evitar que a requisição fique pendente indefinidamente
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos de timeout
    
    const response = await fetch('https://backend-plugin-ai.onrender.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        plugin: 'jessica' // 👈 altere aqui conforme o plugin
      }),
      signal: controller.signal
    });
    
    // Limpar o timeout se a resposta chegar antes do limite
    clearTimeout(timeoutId);

    console.log("📨 Status da resposta:", response.status);

    // Se a resposta não for bem-sucedida (não status 2xx), trata como erro
    if (!response.ok) {
      const errorData = await response.json(); // Captura o erro retornado como JSON
      console.error("❌ Erro recebido:", errorData.error); // Exibe o erro no console

      // Exibe o erro diretamente para o usuário com a mensagem específica
      alert(errorData.error || 'Erro ao se conectar com a IA.'); // Se não houver um erro específico, mostra um erro genérico
      return null;
    }

    const data = await response.json();
    console.log("✅ Resposta da IA:", data);
    
    // Exibir informações de uso se disponíveis
    if (data.usage) {
      showUsageInfo(data.usage);
    }
    
    return data.result.trim();
  } catch (error) {
    // Verificar se foi um erro de timeout
    if (error.name === 'AbortError') {
      console.error('⚠️ Timeout na requisição para a IA');
      alert('A requisição demorou muito tempo. Por favor, tente novamente.');
    } else {
      console.error('⚠️ Erro na comunicação com o servidor:', error);
      alert('Ocorreu um erro ao processar sua solicitação.');
    }
    return null;
  }
}

// Função para exibir informações de uso
function showUsageInfo(usage) {
  // Remover qualquer info de uso anterior
  const existingInfo = document.getElementById('jessica-usage-info');
  if (existingInfo) {
    existingInfo.remove();
  }
  
  // Criar elemento para mostrar informações de uso
  const usageInfo = document.createElement('div');
  usageInfo.id = 'jessica-usage-info';
  usageInfo.className = 'usage-info';
  usageInfo.style.position = 'fixed';
  usageInfo.style.bottom = '75px';
  usageInfo.style.right = '15px';
  usageInfo.style.backgroundColor = 'rgba(255, 0, 0, 0.9)';
  usageInfo.style.padding = '8px';
  usageInfo.style.borderRadius = '5px';
  usageInfo.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  usageInfo.style.zIndex = '9999';
  
  usageInfo.innerHTML = `
    <div>Requisições: ${usage.requestsToday}/${usage.requestLimit}</div>
    <div>Tokens: ${usage.tokensToday}/${usage.tokenLimit}</div>
  `;
  
  document.body.appendChild(usageInfo);
  
  // Remover após 5 segundos
  setTimeout(() => {
    if (document.body.contains(usageInfo)) {
      usageInfo.style.opacity = '0';
      usageInfo.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        if (document.body.contains(usageInfo)) {
          document.body.removeChild(usageInfo);
        }
      }, 500);
    }
  }, 5000);
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
    background: #000000;
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


// Verificar uso atual ao iniciar
async function checkCurrentUsage() {
  try {
    const response = await fetch('https://backend-plugin-ai.onrender.com/usage/jessica');
    
    if (response.ok) {
      const data = await response.json();
      console.log("📊 Informações de uso:", data);
      
      // Armazenar localmente para referência
      localStorage.setItem('jessicaUsageData', JSON.stringify(data));
    }
  } catch (error) {
    console.error('⚠️ Erro ao verificar uso:', error);
  }
}

// Chamar ao iniciar
document.addEventListener('DOMContentLoaded', () => {
  checkCurrentUsage();
  // Verificar uso a cada hora
  setInterval(checkCurrentUsage, 3600000);
});
