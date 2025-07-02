let libros = []
        const ejemplos = [
            {titulo: "Don Quijote", autor: "Cervantes", estado: "leido"},
            {titulo: "Cien años de soledad", autor: "García Márquez", estado: "leyendo"},
            {titulo: "1984", autor: "George Orwell", estado: "no-leido"}
        ]
        let tiempoMensaje   
        //Funciones de utilidad
        const guardarLibros = () => localStorage.setItem('bibliotecaLibros', JSON.stringify(libros))
        const cargarLibros = () => {
            const data = localStorage.getItem('bibliotecaLibros')
            libros = data ? JSON.parse(data) : []
        }
        const crearLibro = (titulo, autor, estado) => ({
            id: Date.now(),
            titulo: titulo,
            autor: autor,
            estado: estado,
            fecha: new Date().toLocaleDateString()
        })
        // Mostrar mensaje en la interfaz de usuari
        const mostrarMensaje = (texto, tipo) => {
            const areaMensaje = document.getElementById('area-mensaje') 
            areaMensaje.contenidoTexto = texto
            areaMensaje.nombreClase = `show ${tipo}`
            borrarTiempo(tiempoMensaje)
            tiempoMensaje = tiempoEspera(() => {
                areaMensaje.nombreClase = ''
                areaMensaje.contenidoTexto = ''
            }, 3000)
        }
        const validarDatos = (titulo, autor) => {
            if (!titulo || !autor) {
                mostrarMensaje("El título y el autor son obligatorios", "error")
                return false
            }
            return true
        }
        const renderizarLibros = (librosAMostrar = libros) => {
            const lista = document.getElementById('lista-libros')
            if (librosAMostrar.length === 0) {
                lista.innerHTML = '<p style="text-align: center; color: #666;">No hay libros para mostrar</p>'
                return
            }
            lista.innerHTML = librosAMostrar.map(libro => `
                <div class="libro ${libro.estado}">
                    <h3>${libro.titulo}</h3>
                    <div class="libro-info"><strong>Autor:</strong> ${libro.autor}</div>
                    <div class="libro-info"><strong>Estado:</strong> ${libro.estado.replace('-', ' ')}</div>
                    <div class="libro-info"><strong>Agregado:</strong> ${libro.fecha}</div>
                    <div class="acciones">
                        <button onclick="cambiarEstado(${libro.id})">Cambiar Estado</button>
                        <button class="btn-eliminar" onclick="eliminarLibro(${libro.id})">Eliminar</button>
                    </div>
                </div>
            `).join('')
        }
        const actualizarStats = () => {
            const totalLibros = libros.length
            const librosLeidos = libros.filter(libro => libro.estado === 'leido').length
            const librosLeyendo = libros.filter(libro => libro.estado === 'leyendo').length

            document.getElementById('total').textContent = totalLibros
            document.getElementById('leidos').textContent = librosLeidos
            document.getElementById('leyendo').textContent = librosLeyendo
        }
        const actualizarUIYGuardar = () => {
            guardarLibros()
            renderizarLibros()
            actualizarStats()
        }
        //Funciones Principales 
        const agregarLibro = () => {
            const titulo = document.getElementById('titulo').value.trim()
            const autor = document.getElementById('autor').value.trim()
            const estado = document.getElementById('estado').value
            if (!validarDatos(titulo, autor)) return
            libros.push(crearLibro(titulo, autor, estado))
            actualizarUIYGuardar()
            document.getElementById('titulo').value = ''
            document.getElementById('autor').value = ''
            mostrarMensaje(`Libro "${titulo}" agregado correctamente`, "info")
        }
        const agregarEjemplos = () => {
            let addedCount = 0
            ejemplos.forEach(ejemplo => {
                const nuevoLibro = crearLibro(ejemplo.titulo, ejemplo.autor, ejemplo.estado)
                const exists = libros.some(b => b.titulo === nuevoLibro.titulo && b.autor === nuevoLibro.autor)
                if (!exists) {
                    libros.push(nuevoLibro)
                    addedCount++
                }
            })       
            actualizarUIYGuardar()
            if (addedCount > 0) {
                mostrarMensaje(`${addedCount} libros de ejemplo agregados`, "info")
            } else {
                mostrarMensaje("Los libros de ejemplo ya existen en la biblioteca.", "info")
            }
        }
        const cambiarEstado = (id) => {
            const libro = libros.find(l => l.id === id)
            if (libro) {
                const estados = ['no-leido', 'leyendo', 'leido']
                const currentIndex = estados.indexOf(libro.estado)
                libro.estado = estados[(currentIndex + 1) % estados.length]
                mostrarMensaje(`Estado de "${libro.titulo}" cambiado a: ${libro.estado.replace('-', ' ')}`, "info")
                actualizarUIYGuardar()
            }
        }
        const eliminarLibro = (id) => {            
                const initialLength = libros.length
                libros = libros.filter(libro => libro.id !== id)
                if (libros.length < initialLength) {
                    mostrarMensaje("Libro eliminado", "info")
                    actualizarUIYGuardar()
                } else {
                    mostrarMensaje("Libro no encontrado.", "error")
                }           
        }
        const buscarLibros = () => {
            const termino = document.getElementById('buscar').value.toLowerCase()
            if (!termino) {
                renderizarLibros()
                mostrarMensaje("Mostrando todos los libros.", "info")
                return
            }
            const librosFiltrados = libros.filter(libro =>
                libro.titulo.toLowerCase().includes(termino) ||
                libro.autor.toLowerCase().includes(termino)
            )          
            renderizarLibros(librosFiltrados)
            if (librosFiltrados.length > 0) {
                 mostrarMensaje(`Encontrados ${librosFiltrados.length} libros`, "info")
            } else {
                mostrarMensaje("No se encontraron libros con ese término de búsqueda.", "info")
            }
        }
        const limpiarTodo = () => {          
                libros = []
                actualizarUIYGuardar()
                document.getElementById('buscar').value = ''
                mostrarMensaje("Biblioteca limpiada completamente", "info")          
        }
        //Inicializacion 
        cargarLibros()
        renderizarLibros()
        actualizarStats()
        mostrarMensaje("Sistema de biblioteca iniciado", "info")

       