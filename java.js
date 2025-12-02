document.addEventListener('DOMContentLoaded', function() {
    
    const modal = document.getElementById('reservation-modal');
    
    if (modal) {
        
        const openModalBtn = document.getElementById('open-modal-btn');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const modalBackdrop = document.getElementById('modal-backdrop');
        
        const checkAvailabilityButton = document.getElementById('check-availability-btn'); 
        const statusMessage = document.getElementById('status-message');
        const errorMessage = document.getElementById('error-message');
        const personalDataSection = document.getElementById('personal-data-section'); 
        const reservationForm = document.getElementById('reservation-form-modal');
        

        function openModal() {
            modal.classList.remove('hidden');
            
            if (statusMessage) {
                statusMessage.textContent = 'Presiona "Comprobar Disponibilidad" para verificar mesas.';
                statusMessage.style.backgroundColor = '#d4edda'; 
                statusMessage.style.color = '#155724'; 
                statusMessage.classList.remove('hidden'); 
            }
            
            if (errorMessage) {
                errorMessage.classList.add('hidden');
            }
            if (personalDataSection) {
                personalDataSection.classList.add('hidden');
            }
            
            if (reservationForm) {
                reservationForm.reset();
            }
        }

        function closeModal() {
            modal.classList.add('hidden');
        }

        if (openModalBtn) {
            openModalBtn.addEventListener('click', function(e) {
                e.preventDefault(); 
                openModal();
            });
        }
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeModal);
        }
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape" && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        if (checkAvailabilityButton) {
            checkAvailabilityButton.addEventListener('click', function(e) {
                e.preventDefault(); 
    
                statusMessage.classList.add('hidden');
                errorMessage.classList.add('hidden');
                personalDataSection.classList.add('hidden'); 
    
                const hora = document.getElementById('hora').value;
                const fechaInput = document.getElementById('fecha').value;
                const clientes = parseInt(document.getElementById('clientes').value);
    
                if (!hora || !fechaInput || isNaN(clientes) || clientes < 1) {
                    errorMessage.textContent = '⛔ Por favor, introduce la fecha, hora y un número de clientes válido (mínimo 1).';
                    errorMessage.classList.remove('hidden');
                    return;
                }
    
                const fecha = new Date(fechaInput + 'T00:00:00'); 
                const dayOfWeek = fecha.getUTCDay(); 
                const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
                
                if ((isWeekend && hora >= '20:30') || clientes > 8) {
                    
                    errorMessage.textContent = '❌ Lo sentimos, no hay disponibilidad para estas condiciones.';
                    errorMessage.classList.remove('hidden'); 
                    
                } else {
                    
                    statusMessage.classList.remove('hidden');
                    statusMessage.textContent = '✅ ¡Disponibilidad Confirmada! Completa tus datos para finalizar la reserva.';
                    statusMessage.style.backgroundColor = '#d4edda'; 
                    statusMessage.style.color = '#155724'; 
                    
                    personalDataSection.classList.remove('hidden'); 
                }
            });
        }
        
        if (reservationForm) {
            reservationForm.addEventListener('submit', function(e) {
                e.preventDefault(); 
                
                statusMessage.classList.add('hidden');
                errorMessage.classList.add('hidden');
                personalDataSection.classList.add('hidden');
    
                statusMessage.textContent = '🎉 ¡Reserva Confirmada con Éxito! Recibirás un correo de confirmación pronto.';
                statusMessage.style.backgroundColor = '#d1e7dd'; 
                statusMessage.style.color = '#0f5132'; 
                statusMessage.classList.remove('hidden'); 
                
                setTimeout(closeModal, 3000); 
            });
        }
    } 
    
    
    if (!modal) {
        const indexOpenBtn = document.getElementById('open-modal-btn');
        if (indexOpenBtn) {
            indexOpenBtn.addEventListener('click', function(e) {
                
                e.preventDefault(); 
                
                window.location.href = 'reservas.html';
            });
        }
    }

});
