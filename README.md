To restructure and update the README file based on your instructions, I'll organize it into a more readable format, update sections as requested, and make adjustments to align with the changes you've specified. Here's the revised README structure:

```markdown
# StudyNotion

StudyNotion is an EdTech platform designed to provide an engaging learning experience for students and a comprehensive teaching platform for instructors. The platform offers a wide range of courses, user-friendly interfaces for both students and instructors, and a secure and efficient back-end to manage courses and user data.

## DEMO Preview

Preview the features and interfaces of StudyNotion through the following screenshots, showcasing various functionalities and pages within the platform:

![Screenshot 1](https://github.com/velocitypanther/StudyNotion/assets/112251957/4d75101f-10c9-4edd-9877-c4e3f5847c8e)
![Screenshot 2](https://github.com/velocitypanther/StudyNotion/assets/112251957/65a8bee2-ce90-484a-9f36-4011c00ce017)
![Screenshot 3](https://github.com/velocitypanther/StudyNotion/assets/112251957/e5458fdb-cf25-4548-98b3-65b068ea38e1)
![Screenshot 4](https://github.com/velocitypanther/StudyNotion/assets/112251957/ab602c50-5c97-4c48-bf8f-7e371e8b5ac9)

## Installation

To set up your local development environment for StudyNotion, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Horror26/StudyNotion.git
   ```
2. Navigate to the project directory:
   ```sh
   cd StudyNotion
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Configuration

Configure the application environment before starting the development server:

1. Rename `example.env` in the project root to `.env` and update the environment variables as needed.
2. Start the development server:
    ```sh
    npm run dev
    ```

## Contributing

We welcome contributions to StudyNotion! If you have suggestions for improvements or encounter any issues, please feel free to open an issue or submit a pull request.

## System Architecture

StudyNotion utilizes a client-server architecture, with ReactJS for the front-end, NodeJS and ExpressJS for the back-end, and MongoDB as the database. The platform is divided into student and instructor functionalities, providing tailored experiences for both user types.

### Front-end

- Built with ReactJS for dynamic and responsive UI/UX.
- Uses Redux for state management and Tailwind CSS for styling.
- The front-end communicates with the back-end via RESTful API calls.

### Back-end

- Utilizes NodeJS and ExpressJS to serve APIs for course management, user authentication, and more.
- Integrates with MongoDB for data storage, supporting flexible data schemas.
- Implements security features like JWT for authentication and bcrypt for password hashing.

### Database

- Employs MongoDB, a NoSQL database, for storing user data and course content.

## Architecture Diagram

(Include an architecture diagram if available.)

For detailed information on the system architecture, including data models and back-end features, please refer to the respective sections above.

Thank you for exploring StudyNotion. We're excited to contribute to the future of online education together!
```

This structure includes the requested changes, such as updating the live section to "DEMO Preview" and adding the specified images with adjusted links. It also organizes the README content into a more structured format, providing clarity and a comprehensive overview of the StudyNotion platform.