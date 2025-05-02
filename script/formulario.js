document.getElementById('contatoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const btn = form.querySelector('.btn-enviar');
    const btnText = form.querySelector('.btn-text');
    const btnLoading = form.querySelector('.btn-loading');
    const status = document.getElementById('formStatus');
    
    // Mostrar estado de carregamento
    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    status.textContent = '';
    status.className = 'form-status';
    
    try {
        // Enviar para o FormSubmit
        const response = await fetch('https://formsubmit.co/ajax/joaosntoosrocha@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: form.name.value,
                email: form.email.value,
                message: form.message.value,
                _subject: 'Novo contato do site Next Health',
                _template: 'table',
                _autoresponse: 'Recebemos sua mensagem! Em breve entraremos em contato.'
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Mostrar notificação personalizada
            showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
            
            // Redirecionar após 3 segundos (opcional)
            setTimeout(() => {
                window.location.href = 'obrigado.html';
            }, 3000);
        } else {
            throw new Error(result.message || 'Erro ao enviar formulário');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification(error.message || 'Ocorreu um erro ao enviar. Tente novamente.', 'error');
    } finally {
        btn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }
});

// Função para mostrar notificação estilizada
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg viewBox="0 0 24 24" width="24" height="24">
                ${type === 'success' ? 
                    '<path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>' : 
                    '<path fill="currentColor" d="M13 13H11V7H13M13 17H11V15H13M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2Z"/>'}
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}