import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const MainAssessmentButton = () => {
    const { createMainAssessment } = useAppContext();
    const { currentUser } = useAuth();

    const handleClick = () => {
        const userID = currentUser.uid;
        const pillarAssessments = 'pillarAssessments';
        const PA = 'PA';

        createMainAssessment(userID, pillarAssessments, PA);
    }

    return (
        <button onClick={handleClick}>Create Main Assessment</button>
    );
}

export default MainAssessmentButton;
