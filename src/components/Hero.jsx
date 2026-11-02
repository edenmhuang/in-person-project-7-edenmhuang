const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Eden Huang</span>
          </h1>
          <p className="hero-subtitle">
            Frontend Developer &amp; UI Designer
          </p>
          <p className="hero-description">
            Creating beautiful, responsive web experiences with modern technologies.
            I specialize in React, modern CSS, and responsive design patterns
            that work beautifully across all devices.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;