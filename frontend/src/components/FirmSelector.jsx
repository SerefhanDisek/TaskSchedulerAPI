import PropTypes from "prop-types"; 

const FirmSelector = ({ onSelectFirm }) => {
    const handleChange = (event) => {
        const selectedFirm = event.target.value;
        onSelectFirm(selectedFirm);
    };

    return (
        <div>
            <label htmlFor="firm-select">Firma Secin:</label>
            <select id="firm-select" onChange={handleChange}>
                <option value="NUKON">NUKON</option>
                <option value="NURÝ KÖRÜSTAN MAKÝNE">NURI KORUSTAN MAKINE</option>
                <option value="NKN">NKN</option>
            </select>
        </div>
    );
};

FirmSelector.propTypes = {
    onSelectFirm: PropTypes.func.isRequired, 
};

export default FirmSelector;
