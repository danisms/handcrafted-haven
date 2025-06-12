// Store all developers info and data for display

type Developer = {
    id: string,
    name: string;  // full name (firstname, middlename(opt), lastname)
    role: string;  // what role did you play in the creation
    title?: string;  // what title do you have or a nickname
    about: string;
    photo_url?: string;
    contact?: {
        phone?: number;
        whatsapp?: number;
        email?: string;
        github?: string;
        linkedin?: string;
        twitter?: string;
        facebook?: string;
        instagram?: string;
    }
}

type Developers = Array<Developer>;

export const developers: Developers = [
    {
        id: "1",
        name: "Daniel C. Opute",
        role: "Fullstack Dev.",
        title: "Danism",
        about: "Daniel C. Opute is a creative full-stack web developer with a passion for building purposeful digital solutions. With strong skills in JavaScript, PHP, and MySQL, he turns ideas into intuitive, scalable web apps. Balancing academics with real-world coding, Daniel consistently pushes his limits to grow and innovate. What sets him apart? He makes tech fun—often turning programming languages into characters and stories. For Daniel, coding isn’t just logic—it’s art with purpose.",
        photo_url: "/developers/danielcopute.png",
        contact: {
            phone: +2348073956165,
            whatsapp: +2348073956165,
            email: 'danielcopute@gmail.com',
            github: 'https://github.com/danisms',
            linkedin: 'https://www.linkedin.com/in/danielopute',
            twitter: 'https://x.com/DanielOpute',
            facebook: 'https://web.facebook.com/Daniel.C.Opute',
            instagram: 'https://www.instagram.com/daniel.opute'
        }
    },
    {
        id: "2",
        name: "Gustavo Lima de Sousa",
        role: "Fullstack Dev.",
        title: "",
        about: "Gustavo Lima de Sousa is a passionate full stack web developer who blends technical precision with creative problem-solving. From dynamic front-end interfaces to robust back-end systems, he crafts seamless digital experiences. Dedicated to clean code, scalability, and user-focused design, Gustavo brings ideas to life across the web.",
        photo_url: "/developers/gustavo-lima-de-sousa.png",
        contact: {
            email: "gustavolimadesousa@hotmail.com",
            github: "https://github.com/gustavolimadesousa",
            linkedin: "https://www.linkedin.com/in/gustavolimadesousa",
        }
    },
    {
        id: "3",
        name: "Lucas Mendonca de Souza",
        role: "Fullstack Dev.",
        title: "",
        about: "Lucas Mendonça de Souza is a skilled full stack web developer with a strong eye for detail and performance. He builds responsive front-end designs and powerful back-end solutions that work in harmony. Passionate about technology and innovation, Lucas transforms complex ideas into elegant, efficient web applications that deliver real impact.",
        photo_url: "/developers/lucas-mendonca-de-souza.png",
        contact: {
            email: "lsouza@byupathway.edu",
            github: "https://github.com/lmspathway",
            linkedin: "https://www.linkedin.com/in/lmsdevop",
        }
    },
]