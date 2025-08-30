# Tailwind-jQuery Modal Plugin

A lightweight, customizable, and feature-rich modal plugin that combines the power of jQuery with the elegance of Tailwind CSS. Perfect for modern web applications requiring beautiful and responsive modal dialogs.

## ✨ Features

- **Multiple Modal Types**: Standard modals, slide panels, image viewers, and video modals
- **Responsive Design**: Fully responsive with mobile-first approach
- **Tailwind CSS Integration**: Seamlessly works with Tailwind CSS utility classes
- **Smooth Animations**: CSS3-powered transitions and animations
- **Multiple Sizes**: Small, medium, and large modal variants
- **Slide Panels**: Left and right sliding panels for navigation and settings
- **Media Modals**: Dedicated image and video modal support
- **YouTube Integration**: Direct YouTube video embedding
- **Image Zoom**: Built-in image zoom functionality
- **Keyboard Support**: ESC key to close modals
- **Backdrop Closing**: Click outside to close (configurable)
- **Programmatic Control**: Full JavaScript API for modal management
- **Event Callbacks**: Comprehensive event system
- **Lightweight**: Minimal footprint with no external dependencies except jQuery

## 🚀 Quick Start

### Installation

1. **Download the files**:
   ```bash
   git clone https://github.com/iamitpkumar/tailwind-jquery-modal.git
   ```

2. **Include the required dependencies**:
   ```html
   <!-- jQuery -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
   
   <!-- Tailwind CSS -->
   <script src="https://cdn.tailwindcss.com"></script>
   
   <!-- Plugin Files -->
   <link rel="stylesheet" href="tailwind-jquery-modal.css">
   <script src="tailwind-jquery-modal.js"></script>
   ```

### Basic Usage

1. **Create a modal trigger**:
   ```html
   <button data-modal-target="#myModal" class="bg-blue-500 text-white px-4 py-2 rounded">
       Open Modal
   </button>
   ```

2. **Define your modal**:
   ```html
   <div id="myModal" class="modal" data-size="medium">
       <h3 class="text-xl font-semibold mb-4">Modal Title</h3>
       <p class="mb-4">Your modal content goes here...</p>
       <button data-modal-close class="bg-gray-500 text-white px-4 py-2 rounded">
           Close
       </button>
   </div>
   ```

3. **Initialize the plugin**:
   ```javascript
   $(document).ready(function() {
       $('.modal').TailwindModal();
   });
   ```

## 📖 Documentation

### Modal Types

#### Standard Modals
```html
<!-- Small Modal -->
<div id="smallModal" class="modal" data-size="small">
    <!-- Content -->
</div>

<!-- Medium Modal (default) -->
<div id="mediumModal" class="modal" data-size="medium">
    <!-- Content -->
</div>

<!-- Large Modal -->
<div id="largeModal" class="modal" data-size="large">
    <!-- Content -->
</div>
```

#### Slide Panels
```html
<!-- Left Slide Panel -->
<div id="leftPanel" class="modal" data-type="slide-left" data-width="400">
    <!-- Content -->
</div>

<!-- Right Slide Panel -->
<div id="rightPanel" class="modal" data-type="slide-right" data-width="500">
    <!-- Content -->
</div>
```

#### Media Modals
```html
<!-- Image Modal -->
<div id="imageModal" class="modal" data-type="image" data-img="path/to/image.jpg" data-alt="Image Alt Text">
</div>

<!-- Video Modal -->
<div id="videoModal" class="modal" data-type="video" data-video="https://www.youtube.com/watch?v=VIDEO_ID">
</div>
```

### Configuration Options

```javascript
$('.modal').TailwindModal({
    // Appearance
    background: '#ffffff',              // Modal background color
    textColor: '#374151',              // Text color
    overlayColor: 'rgba(0, 0, 0, 0.75)', // Backdrop color
    borderRadius: '0.5rem',            // Border radius
    
    // Behavior
    animation: true,                   // Enable/disable animations
    closeButton: true,                 // Show close button
    closeOnBackdrop: true,            // Close on backdrop click
    closeOnEscape: true,              // Close on ESC key
    
    // Media Options
    videoAutoplay: true,              // Autoplay videos
    imageZoom: true,                  // Enable image zoom
    
    // Callbacks
    onOpen: function() {              // Before modal opens
        console.log('Opening...');
    },
    onShow: function() {              // After modal is shown
        console.log('Modal visible!');
    },
    onClose: function() {             // Before modal closes
        console.log('Closing...');
    },
    onHide: function() {              // After modal is hidden
        console.log('Modal hidden!');
    }
});
```

### JavaScript API

```javascript
// Show modal
$('#myModal').TailwindModal('show');

// Hide modal
$('#myModal').TailwindModal('hide');

// Toggle modal
$('#myModal').TailwindModal('toggle');

// Destroy modal instance
$('#myModal').TailwindModal('destroy');

// Update options
$('#myModal').TailwindModal('option', 'closeOnBackdrop', false);
```

### Data Attributes

| Attribute | Description | Values |
|-----------|-------------|---------|
| `data-size` | Modal size | `small`, `medium`, `large` |
| `data-type` | Modal type | `slide-left`, `slide-right`, `image`, `video` |
| `data-width` | Custom width for slide panels | Any valid CSS width |
| `data-img` | Image path for image modals | File path or URL |
| `data-alt` | Alt text for images | Any string |
| `data-video` | Video URL for video modals | YouTube URL |
| `data-modal-target` | Target modal selector | CSS selector |
| `data-modal-close` | Close modal trigger | No value needed |

### CSS Classes

The plugin uses Tailwind CSS classes for styling. Key classes include:

- `.modal` - Base modal class
- `.modal-overlay` - Backdrop overlay
- `.modal-container` - Modal container
- `.modal-content` - Modal content wrapper

## 🎨 Customization

### Custom Styling

You can override default styles by modifying the CSS file or adding your own styles:

```css
.modal-content {
    /* Custom modal content styling */
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-overlay {
    /* Custom overlay styling */
    backdrop-filter: blur(4px);
}
```

### Theme Integration

The plugin works seamlessly with Tailwind's utility classes:

```html
<div id="darkModal" class="modal bg-gray-800 text-white" data-size="medium">
    <h3 class="text-xl font-bold text-yellow-400 mb-4">Dark Theme Modal</h3>
    <p class="text-gray-300 mb-6">This modal uses a dark theme.</p>
    <button data-modal-close class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
        Close
    </button>
</div>
```

## 🔧 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📝 Examples

Check out the included `index.html` file for comprehensive examples of all modal types and features.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using jQuery and Tailwind CSS
- Inspired by modern modal design patterns
- Thanks to the open-source community for feedback and contributions

## 📞 Support

If you encounter any issues or have questions:

1. Check the [documentation](#documentation) above
2. Look through existing [issues](https://github.com/iamitpkumar/tailwind-jquery-modal/issues)
3. Create a new issue with detailed information

## 🔗 Links

- [Demo](https://iamitpkumar.github.io/tailwind-jquery-modal/) - Live demo
- [Issues](https://github.com/iamitpkumar/tailwind-jquery-modal/issues) - Bug reports and feature requests
- [Author](https://github.com/iamitpkumar) - Amit P. Kumar
- [Company](https://www.pstechglobal.com) - PS TECH GLOBAL

---

**Made with ❤️ by [Amit P. Kumar](https://github.com/iamitpkumar)**
