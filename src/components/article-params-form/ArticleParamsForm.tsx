import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArticleStateType } from '../../constants/articleProps';
import { fontFamilyOptions } from '../../constants/articleProps';
import { fontSizeOptions } from '../../constants/articleProps';
import { fontColors } from '../../constants/articleProps';
import { backgroundColors } from '../../constants/articleProps';
import { contentWidthArr } from '../../constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { OptionType } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { defaultArticleState } from '../../constants/articleProps';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>; //запомни что distpatch это функция принимающая згначение типа T, а сетстейт новое значение назначает тип
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleState,
	setArticleState,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formValues, setFormValues] = useState(articleState);

	const asideRef = useRef<HTMLElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleCkickOutside = (e: MouseEvent) => {
			const target = e.target as Node;
			console.log(isOpen);
			if (
				isOpen &&
				asideRef.current &&
				!asideRef.current.contains(target) &&
				buttonRef.current &&
				!buttonRef.current.contains(target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleCkickOutside);
		return () => document.removeEventListener('mousedown', handleCkickOutside);
	}, [isOpen]);

	const handelFontFamily = (option: OptionType) => {
		setFormValues({ ...formValues, fontFamilyOption: option });
	};

	const handelFontSize = (option: OptionType) => {
		setFormValues({ ...formValues, fontSizeOption: option });
	};

	const handelFontColor = (option: OptionType) => {
		setFormValues({ ...formValues, fontColor: option });
	};

	const handelBackgroundColor = (option: OptionType) => {
		setFormValues({ ...formValues, backgroundColor: option });
	};

	const handelContentWidth = (option: OptionType) => {
		setFormValues({ ...formValues, contentWidth: option });
	};

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formValues);
	};

	const handleResetForm = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				ref={buttonRef}
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formValues.fontFamilyOption}
						title='шрифт'
						onChange={handelFontFamily}></Select>
					<RadioGroup
						options={fontSizeOptions}
						selected={formValues.fontSizeOption}
						name='radio'
						title='Размер шрифта'
						onChange={handelFontSize}></RadioGroup>
					<Select
						options={fontColors}
						selected={formValues.fontColor}
						title='цвет шрифта'
						onChange={handelFontColor}></Select>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formValues.backgroundColor}
						title='цвет фона'
						onChange={handelBackgroundColor}></Select>
					<Select
						options={contentWidthArr}
						selected={formValues.contentWidth}
						title='ширина контейнера'
						onChange={handelContentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
