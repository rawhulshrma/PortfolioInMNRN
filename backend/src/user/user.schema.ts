// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;

// @Schema()
// export class User {
//   _id: string;

//   @Prop({ required: true })
//   name: string;

//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true })
//   password: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: { description: String } })
  about: Record<string, any>;

  @Prop([
    {
      image: {
        public_id: String,
        url: String,
      },
      title: { type: String, required: true },
      description: { type: String, required: true },
      technologies: [{ type: String, required: true }],
      viewUrl: { type: String, required: true },
      sourceCodeUrl: { type: String, required: true },
    },
  ])
  projects: any[];

  @Prop([
    {
      image: {
        public_id: String,
        url: String,
      },
    },
  ])
  latestWork: any[];

  @Prop([
    {
      title: String,
      subtitle: String,
      image: {
        public_id: String,
        url: String,
      },
      techs: [
        {
          name: String,
          icon: {
            public_id: String,
            url: String,
          },
        },
      ],
    },
  ])
  skills: any[];
}

export const UserSchema = SchemaFactory.createForClass(User);
