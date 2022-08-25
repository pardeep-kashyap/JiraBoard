import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { CommentOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const Comments = ({ commentAdded, commentsInput }) => {
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');


    useEffect(() => {
        setComments(commentsInput)
        console.log("commentsInput", commentsInput);
    }, [commentsInput])

    const handleSubmit = () => {
        if (!value) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            const allComments = [
                ...comments,
                {
                    author: 'Anonymous',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    content: value,
                    datetime: moment().fromNow(),
                },
            ]
            console.log("allComments", allComments)
            setValue('');

            setComments(allComments);
            commentAdded(allComments)
        }, 1000);
    };


    const handleChange = (e) => {
        console.log("e.target.value", e.target.value)
        setValue(e.target.value);
    };

    return (
        <>
            <h1 className="inline flex items-center text-xl font-bold text-gray-600	">
                <CommentOutlined className='pr-2' />
                Activity</h1>

            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />

        </>
    );
};

export default Comments;