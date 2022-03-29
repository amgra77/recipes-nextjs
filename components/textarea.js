import { useField } from 'formik';

const MyTextArea = ({ label, ...props }) => {
    const [ field, meta ] = useField(props);
    return (
        <div className="form-group">
            <label htmlFor={props.id||props.name}>{label}</label>
            <textarea className={(meta.touched && meta.error ? "border border-danger" : "") + " form-control"} {...field} {...props} cols="30" rows="20"></textarea>
            { meta.touched && meta.error ? <small className="text-danger">{meta.error}</small> : null }
        </div>
    );
}

export default MyTextArea;