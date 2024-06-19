from .models import User

class Friend:
    def __init__(self, name, status):
        self.name = name
        self.status = status
    
    def to_dict(self):
        return {
            'username': self.username,
            'status': self.status
        }

    def __str__(self):
        return f"{self.name} {self.status}"

def get_user_data(user):
    userOut = {
        'username': user.username,

        'spaceInvadersGamesPlayed': user.spaceInvadersGamesPlayed,
        'spaceInvadersWins': user.spaceInvadersWins,
        'spaceInvadersLosses': user.spaceInvadersLosses,
        'spaceInvadersTie': user.spaceInvadersTie,
        
        'pongGamesPlayed': user.pongGamesPlayed,
        'pongWins': user.pongWins,
        'pongLosses': user.pongLosses,
        'pongTie': user.pongTie,

        'profile_image': user.profile_image.url if user.profile_image else None,
    }
    return userOut

def create_user_from_data(data):
    return User.objects.create_user(
        first_name=data['firstName'],
        last_name=data['lastName'],
        birth_date=data['birthDate'],
        email=data['email'],
        username=data['username'],
        password=data['password']
    )

def create_user_from_42data(data):

    user, created = User.objects.get_or_create(
        username=data['login'],
        defaults={
            'first_name': data['first_name'],
            'last_name': data['last_name'],
            'birth_date': None,
            'email': data['email'],
            'registered_via_oauth': True
        }
    )

    if created:
        user.set_unusable_password()
        #user.registered_via_oauth = True
        user.status = True
        user.save()
    return user

def filter_users(friends):
    friends_data = []

    for friend in friends:
        friend_data = {
            'username': friend.username,
            'status': friend.status
        }
        friends_data.append(friend_data)
    return friends_data

def get_friends_data(user):
    friends = []

    if (hasattr(user, 'friends')):
        friends = user.friends.all()
    
    filtered_friends = filter_users(friends)
    return filtered_friends
