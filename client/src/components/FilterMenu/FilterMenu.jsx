import CustomAccordion from "../CustomAccordion/CustomAccordion";
import {Formik, Form, Field} from "formik";
import styles from "./FilterMenu.module.scss"

function FilterMenu() {
    const initialValues = {
        checked: [],
    }


    return (
        <div className={styles.filter}>
           <Formik
            initialValues={initialValues}
            >
                <Form>
                    <CustomAccordion title='genre' content={
                        <>
                        <label>
                        <Field type="checkbox" name="checked" value="Action" />
                        Action
                        </label>
                        <label>
                        <Field type="checkbox" name="checked" value="Shooter" />
                        Shooter
                        </label>                        
                        <label>
                        <Field type="checkbox" name="checked" value="Strategy" />
                        Strategy
                        </label>                        
                        <label>
                        <Field type="checkbox" name="checked" value="Adventure" />
                        Adventure
                        </label>
                        </>
                    } />
                    <CustomAccordion title='platform' content={
                        <>
                        <label>
                        <Field type="checkbox" name="checked" value="PS5" />
                        PS5
                        </label>                        
                        <label>
                        <Field type="checkbox" name="checked" value="PS4" />
                        PS5
                        </label>                        
                        <label>
                        <Field type="checkbox" name="checked" value="PC" />
                        PC
                        </label>                        
                        <label>
                        <Field type="checkbox" name="checked" value="Xbox" />
                        Xbox
                        </label>
                        </>
                    } />
                    <CustomAccordion title='age' content={
                        <>
                        <label>
                        <Field type="checkbox" name="checked" value="6+" />
                        6+
                        </label>                        
                        <label>
                        <Field type="checkbox" name="checked" value="12+" />
                        12+
                        </label>                        
                        <label>
                        <Field type="checkbox" name="checked" value="16+" />
                        16+
                        </label>                        
                        <label>
                        <Field type="checkbox" name="checked" value="18+" />
                        18+
                        </label>
                        </>
                    } />
                </Form>
            </Formik>
        </div>
    );
}

export default FilterMenu